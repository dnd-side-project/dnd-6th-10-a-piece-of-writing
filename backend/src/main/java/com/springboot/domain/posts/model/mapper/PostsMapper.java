package com.springboot.domain.posts.model.mapper;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostsMapper {

    PostsMapper INSTANCE = Mappers.getMapper(PostsMapper.class);

    PostsListResponseDto postsToPostsListResponseDto(Posts posts);

    PostsResponseDto postsToPostsResponseDto(Posts posts);
}
