package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.MultipartDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

//    public Posts findPostsById(Long id);
//    public Member findMemberById(Long id);
//
//    public Long save(String ref, String content, MultipartDto multipartDto, UserDetailsImpl userDetails);
//    public Long delete(Long id);
//    public List<PostsListResponseDto> findAllPostsOrderByIdDesc(int page, Long userId);
//    public List<PostsListResponseDto> findAllPostsBySearch(int page, String content, String type, Long userId);
    Long save(PostsDto requestDto);

    Long removeWithReplies(Long postsId);

    public List<PostsDto> findAllPostsOrderByIdDesc(int page, int size);

    public List<PostsDto> findAllPostsBySearch(int page, int size, String content, String type);

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(MultipartFile multipartFile, String fileName);

    public String postsImgExtractWords(MultipartFile multipartFile, String imageUrl);
//    PageResultDto<PostsListResponseDto, Posts> getList(PageRequestDto requestDTO, Long userId);
//    public ResponseEntity<ResponseDto> likePost(UserDetailsImpl userDetailsImpl, Long id);
//    public ResponseEntity<ResponseDto> disLikePost(UserDetailsImpl userDetailsImpl, Long id);


    PageResultDto<PostsDto, Object[]> getList(PageRequestDto pageRequestDTO);

    PostsDto get(Long id);

//    default PostsListResponseDto entityToDto(Posts entity, Long userId) {
//        return PostsListResponseDto.builder()
//            .id(entity.getId())
//            .content(entity.getContent())
//            .author(entity.getMemberBasicInfo())
//            .imageUrl(entity.getImageUrl())
//            .createdDate(entity.getCreatedDate())
//            .modifiedDate(entity.getModifiedDate())
//            .alreadyLike(findMemberById(userId).getLikePostsList().stream().anyMatch(P -> Objects.equals(
//                    P.getId(), entity.getId())))
//            .likes(entity.getLikeMemberListSize())
    // PostsDto To Posts Entity
    default Posts dtoToEntity(PostsDto dto) {

        Member author = Member.builder()
            .id(dto.getAuthorId())
            .build();

        return Posts.builder()
            .ref(dto.getRef())
            .content(dto.getContent())
            .author(author)
            .build();
    }

    // Posts Entity TO PostsDto
    default PostsDto entityToDTO(Posts posts, Member author) {

        PostsDto dto = PostsDto.builder()
            // posts
            .id(posts.getId())
            .content(posts.getContent())
            .ref(posts.getRef())
            .createdDate(posts.getCreatedDate())
            .modifiedDate(posts.getModifiedDate())
            // author
            .authorId(author.getId())
            .authorEmail(author.getEmail())
            .authorNickname(author.getNickname())

            .build();

        return dto;
    }
}
