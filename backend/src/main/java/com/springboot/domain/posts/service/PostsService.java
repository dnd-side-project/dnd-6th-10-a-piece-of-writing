package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
//import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    public Long save(PostsSaveRequestDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    public Long delete(Long id);

    public List<PostsListResponseDto> findAllPostsOrderByIdDesc(int page);

    public List<PostsListResponseDto> findAllPostsBySearch(int page, String content, String type);

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(GoogleCredentials credentials, MultipartFile multipartFile,
        String fileName);

    public String postsImgExtractWords(GoogleCredentials credentials, MultipartFile multipartFile,
        String imageUrl);

    PageResultDto<PostsListResponseDto, Posts> getList(PageRequestDto requestDTO);

    // PostsSaveRequestDto TO Posts Entity. PostsSave 적용 예정.
//    default Guestbook dtoToEntity(GuestbookDTO dto) {
//        Guestbook entity = Guestbook.builder()
//            .gno(dto.getGno())
//            .title(dto.getTitle())
//            .content(dto.getContent())
//            .writer(dto.getWriter())
//            .build();
//        return entity;
//    }

    // Posts Entity TO PostsListResponseDto
    default PostsListResponseDto entityToDto(Posts entity) {

        PostsListResponseDto dto = PostsListResponseDto.builder()
            .id(entity.getId())
            .content(entity.getContent())
            .author(entity.getAuthor())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .build();

        return dto;
    }
}
