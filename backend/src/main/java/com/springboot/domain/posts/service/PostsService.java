package com.springboot.domain.posts.service;


import com.springboot.domain.posts.model.Posts;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.PostsRepository;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

public interface PostsService {

    public Long save(PostsSaveRequestDto requestDto);

//    public Long update(Long id, PostsUpdateRequestDto requestDto);

    public void delete(Long id);

    public PostsResponseDto findById(Long id);

    public List<PostsListResponseDto> findAllPostsOrderById();
    
}
