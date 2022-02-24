package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.MultipartDto;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    Long save(PostsDto requestDto, MultipartDto multipartDto);

    public Posts findPostsById(Long id);

    public Member findMemberById(Long id);

    public Long removePosts(Long postsId, UserDetailsImpl userDetails);

    public List<PostsDto> findAllPostsOrderByIdDesc(int page, int size, UserDetailsImpl userDetails);

    public List<PostsDto> findAllPostsBySearch(int page, int size, String content, String type, UserDetailsImpl userDetails);

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(MultipartFile multipartFile, String fileName);

    public String postsImgExtractWords(MultipartFile multipartFile, String imageUrl);

    public ResponseEntity<ResponseDto> likePost(UserDetailsImpl userDetailsImpl, Long id);

    public ResponseEntity<ResponseDto> disLikePost(UserDetailsImpl userDetailsImpl, Long id);

    PageResultDto<PostsDto, Object[]> getList(PageRequestDto pageRequestDTO, UserDetailsImpl userDetails);

    PostsDto get(Long id, UserDetailsImpl userDetails);

    default Posts dtoToEntity(PostsDto dto, String imageUrl) {
        return Posts.builder()
            .ref(dto.getRef())
            .content(dto.getContent())
            .imageUrl(imageUrl)
            .author(findMemberById(dto.getAuthorId()))
            .build();
    }

    // Posts Entity TO PostsDto
    default PostsDto entityToDTO(Posts posts, Member author, Long displayMemberId) {
        return PostsDto.builder()
            // posts
            .id(posts.getId())
            .content(posts.getContent())
            .ref(posts.getRef())
            .createdDate(posts.getCreatedDate())
            .modifiedDate(posts.getModifiedDate())
            .imageUrl(posts.getImageUrl())
            // author
            .authorId(author.getId())
            .authorEmail(author.getEmail())
            .authorNickname(author.getNickname())
            .authorProfileUrl(author.getProfileUrl())
            .alreadyLike(posts.getLikeMemberList()
                    .stream().anyMatch(L -> Objects.equals(L.getMember().getId(), displayMemberId)))
            .build();
    }
}
