package com.springboot.domain.posts.service;


import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;

import java.util.List;

public interface PostsService {

    public Long save(PostsSaveRequestDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    public void delete(Long id);

    public PostsResponseDto findById(Long id);

    public List<PostsListResponseDto> findAllPostsOrderById();

    public String postsImgUpload();

    public String postsImgExtractWords();
}
