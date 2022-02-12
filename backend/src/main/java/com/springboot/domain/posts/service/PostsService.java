package com.springboot.domain.posts.service;


import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import java.util.List;

public interface PostsService {

    Long save(PostsSaveRequestDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    void delete(Long id);

    PostsResponseDto findById(Long id);

    List<PostsListResponseDto> findAllPostsOrderById();

    String postsImgUpload();

    String postsImgExtractWords();
}
