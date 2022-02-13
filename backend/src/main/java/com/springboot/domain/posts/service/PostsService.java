package com.springboot.domain.posts.service;


import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface PostsService {

    public Long save(PostsSaveRequestDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    public void delete(Long id);

    public PostsResponseDto findById(Long id);

    public List<PostsListResponseDto> findAllPostsOrderById();

    public String getFileUuid();

    public GoogleCredentials getCredentials();

    public String postsImgUpload(GoogleCredentials credentials, MultipartFile multipartFile, String fileName);

    public String postsImgExtractWords(GoogleCredentials credentials, MultipartFile multipartFile, String imageUrl);
}
