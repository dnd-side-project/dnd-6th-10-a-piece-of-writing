package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
//import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    // 0219 변경 예정. author -> member
//    public Long save(PostsSaveRequestDto requestDto);
    public Long save(PostsDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    public Long delete(Long id);

    // 0219 변경 예정. author -> member
//    public List<PostsListResponseDto> findAllPostsOrderByIdDesc(int page);
//
//    public List<PostsListResponseDto> findAllPostsBySearch(int page, String content, String type);

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(GoogleCredentials credentials, MultipartFile multipartFile,
        String fileName);

    public String postsImgExtractWords(GoogleCredentials credentials, MultipartFile multipartFile,
        String imageUrl);

    // 0219 변경 예정. author -> member
//    PageResultDto<PostsListResponseDto, Posts> getList(PageRequestDto requestDTO);
    PageResultDto<PostsDto, Object[]> getList(PageRequestDto pageRequestDTO);


    // PostsDto To Posts Entity
    default Posts dtoToEntity(PostsDto dto){

        Member author = Member.builder()
            .id(dto.getAuthorId())
//            .email(dto.getAuthorEmail())
//            .nickname(dto.getAuthorNickname())
            .build();

//        Member replyer = Member.builder()
//            .id(dto.getReplyerId())
//            .email(dto.getReplyerEmail())
//            .nickname(dto.getReplyerNickname())
//            .build();
//
//        Reply reply = Reply.builder()
//            .id(dto.getReplyId())
//            .text(dto.getText())
//            .replyer(replyer)
//            .build();

        return Posts.builder()
//            .id(dto.getId())
            .ref(dto.getRef())
            .content(dto.getContent())
            .author(author)
            .build();
    }

    // 0219 변경 예정. author -> member
    // Posts Entity TO PostsListResponseDto
//    default PostsListResponseDto entityToDto(Posts entity) {
//
//        PostsListResponseDto dto = PostsListResponseDto.builder()
//            .id(entity.getId())
//            .content(entity.getContent())
//            .author(entity.getAuthor())
//            .createdDate(entity.getCreatedDate())
//            .modifiedDate(entity.getModifiedDate())
//            .build();
//
//        return dto;
//    }

    // Posts Entity TO PostsDto
//    default PostsDto entityToDTO(Posts posts, Member author, Reply reply) {
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
            // reply
//            .replyText(reply.getText())
//            .replyerId(reply.getReplyer().getId())
//            .replyerNickname(reply.getReplyer().getNickname())
//            .replyerEmail(reply.getReplyer().getEmail())

            .build();

        return dto;
    }
}
