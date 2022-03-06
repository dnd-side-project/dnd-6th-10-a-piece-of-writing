package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.MultipartDto;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;

import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.dto.PostsSaveResponseDto;
import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    PostsSaveResponseDto register(PostsSaveRequestDto requestDto, MultipartDto multipartDto);

    public Posts findPostsById(Long id);

    public Member findMemberById(Long id);

    public Long removePosts(Long postsId, UserDetailsImpl userDetails);

    public List<Object> findAllPosts(int page, int size, UserDetailsImpl userDetails);

    public List<Object> findAllPostsBySearch(int page, int size, String keyword, String type,
        Long topicId, UserDetailsImpl userDetails);

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(MultipartFile multipartFile, String fileName);

    public String postsImgExtractWords(MultipartFile multipartFile, String imageUrl);

    public ResponseEntity<ResponseDto> likePost(UserDetailsImpl userDetailsImpl, Long id);

    public ResponseEntity<ResponseDto> disLikePost(UserDetailsImpl userDetailsImpl, Long id);

    PageResultDto<PostsDto, Object[]> getList(PageRequestDto pageRequestDTO,
        Long loginUserId);

    PostsDto get(Long id, UserDetailsImpl userDetails);

    List<PostsDto> getFirstPostsByTopicOrderByIdDesc(Long topicId, UserDetailsImpl userDetails);

    // PostsSaveRequestDto TO Entity
    default Posts dtoToEntity(PostsSaveRequestDto dto, String imageUrl) {
        return Posts.builder()
            .ref(dto.getRef())
            .content(dto.getContent())
            .imageUrl(imageUrl)
            .author(findMemberById(dto.getAuthorId()))
            .build();
    }

    // Posts Entity TO PostsResponseDto
    default PostsDto entityToDTO(Posts posts, Member author, Long displayMemberId) {

        MemberBasicInfoDto authorInfo = MemberBasicInfoDto.entityTOdto(author);

        return PostsDto.builder()
            // posts
            .postsId(posts.getId())
            .content(posts.getContent())
            .ref(posts.getRef())
            .createdDate(posts.getCreatedDate())
            .modifiedDate(posts.getModifiedDate())
            .imageUrl(posts.getImageUrl())
            // author
            .authorInfo(authorInfo)
            .alreadyLike(posts.getLikeMemberList()
                .stream().anyMatch(L -> Objects.equals(L.getMember().getId(), displayMemberId)))
            .build();
    }

    // Entity TO PostsSaveResponseDto
    default PostsSaveResponseDto entityToPostsSaveResponseDto(Posts posts, Member author) {

        MemberBasicInfoDto authorInfo = MemberBasicInfoDto.entityTOdto(author);

        PostsSaveResponseDto dto = PostsSaveResponseDto.builder()
            .postsId(posts.getId())
            .ref(posts.getRef())
            .content(posts.getContent())
            .createdDate(posts.getCreatedDate())
            .imageUrl(posts.getImageUrl())
            .authorInfo(authorInfo)
            .build();

        return dto;
    }
}
