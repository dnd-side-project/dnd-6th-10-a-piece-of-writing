package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.MultipartDto;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
//import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    public Posts findPostsById(Long id);
    public Member findMemberById(Long id);

    public Long save(String ref, String content, MultipartDto multipartDto, UserDetailsImpl userDetails);
    public Long delete(Long id);
    public List<PostsListResponseDto> findAllPostsOrderByIdDesc(int page, Long userId);
    public List<PostsListResponseDto> findAllPostsBySearch(int page, String content, String type, Long userId);
    public String getFileUuid();
    public GoogleCredentials getCredentials();
    public String postsImgUpload(MultipartFile multipartFile, String fileName);
    public String postsImgExtractWords(MultipartFile multipartFile, String imageUrl);
    PageResultDto<PostsListResponseDto, Posts> getList(PageRequestDto requestDTO, Long userId);
    public ResponseEntity<ResponseDto> likePost(UserDetailsImpl userDetailsImpl, Long id);
    public ResponseEntity<ResponseDto> disLikePost(UserDetailsImpl userDetailsImpl, Long id);


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

    default PostsListResponseDto entityToDto(Posts entity, Long userId) {
        return PostsListResponseDto.builder()
            .id(entity.getId())
            .content(entity.getContent())
            .author(entity.getMemberBasicInfo())
            .imageUrl(entity.getImageUrl())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .alreadyLike(findMemberById(userId).getLikePostsList().stream().anyMatch(P -> Objects.equals(
                    P.getId(), entity.getId())))
            .likes(entity.getLikeMemberListSize())
            .build();
    }
}
