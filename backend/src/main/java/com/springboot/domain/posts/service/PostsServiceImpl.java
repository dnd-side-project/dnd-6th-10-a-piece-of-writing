package com.springboot.domain.posts.service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Acl.Role;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import com.google.cloud.vision.v1.ImageSource;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.entity.QPosts;
import com.springboot.domain.posts.repository.PostsRepository;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class PostsServiceImpl implements PostsService {

    private final PostsRepository postsRepository;

    @Override
    @Transactional
    public Long save(PostsSaveRequestDto requestDto) {

        return postsRepository.save(requestDto.toEntity()).getId();
    }

//    @Transactional
//    public Long update(Long id, PostsUpdateRequestDto requestDto){
//        Posts posts = postsRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
//
//        posts.update(requestDto.getRef(),requestDto.getContent());
//
//        return id;
//    }

    @Override
    @Transactional
    public Long delete(Long id) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        postsRepository.delete(posts);

        return id;
    }

    @Override
    public PostsResponseDto findById(Long id) {
        Posts entity = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return new PostsResponseDto(entity);
    }

//    @Override
//    public List<PostsListResponseDto> findAllPostsOrderById() {
//        return postsRepository.findAllByOrderById().stream()
//                .map(PostsListResponseDto::new)
//                .collect(Collectors.toList());
//    }

    @Override
    public List<PostsListResponseDto> findAllPostsOrderByIdDesc(int page) {

        Pageable pageable = PageRequest.of(page,10, Sort.by("id").descending());

        return postsRepository.findAll(pageable).stream()
            .map(PostsListResponseDto::new)
            .collect(Collectors.toList());
    }

    @Override
    public List<PostsListResponseDto> findPostsContainingContent(int page, String content) {

        Pageable pageable = PageRequest.of(page,10, Sort.by("id").descending());

        QPosts posts = QPosts.posts;

        BooleanBuilder builder = new BooleanBuilder();

        BooleanExpression expression = posts.content.contains(content);

        builder.and(expression);

        return postsRepository.findAll(builder, pageable).stream()
            .map(PostsListResponseDto::new)
            .collect(Collectors.toList());
    }

    @Override
    public String getFileUuid() {
        return UUID.randomUUID().toString();
    }

    @Override
    public GoogleCredentials getCredentials() {
        try {
            ClassPathResource resource = new ClassPathResource("gcloud-auth.json");

            return GoogleCredentials.fromStream(new FileInputStream(
                    Paths.get(resource.getURI()).toFile()));
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.CREDENTIAL_ERROR);
        }
    }

    @Override
    public String postsImgUpload(GoogleCredentials credentials, MultipartFile multipartFile, String fileName) {
        try {
            byte[] bytes = multipartFile.getBytes();

            String projectId = "decent-destiny-321408";
            String bucketName = "example-ocr-test";

            Storage storage = StorageOptions.newBuilder().setProjectId(projectId)
                    .setCredentials(getCredentials()).build().getService();

            BlobId blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();

            storage.create(blobInfo, bytes);
            storage.createAcl(blobId, Acl.of(Acl.User.ofAllUsers(), Role.READER));

            return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.IMAGE_INPUT_INVALID);
        }
    }

    @Override
    public String postsImgExtractWords(GoogleCredentials credentials, MultipartFile multipartFile, String imageUrl) {
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ImageSource imgSource = ImageSource.newBuilder().setImageUri(imageUrl).build();
        Image img = Image.newBuilder().setSource(imgSource).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try {
            ImageAnnotatorSettings imageAnnotatorSettings = ImageAnnotatorSettings.newBuilder()
                    .setCredentialsProvider(FixedCredentialsProvider.create(getCredentials()))
                    .build();

            ImageAnnotatorClient client = ImageAnnotatorClient.create(imageAnnotatorSettings);
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            AnnotateImageResponse res = responses.get(0);
            if (res.hasError()) {
                throw new BusinessException(ErrorCode.IMAGE_URL_INPUT_INVALID);
            }
            return res.getTextAnnotationsList().get(0).getDescription();
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.VISION_API_ERROR);
        }
    }
}
