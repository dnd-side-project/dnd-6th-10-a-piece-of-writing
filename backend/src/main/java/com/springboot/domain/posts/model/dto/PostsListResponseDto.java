package com.springboot.domain.posts.model.dto;

import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import com.springboot.domain.member.model.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostsListResponseDto {

    private Long id;
    private String ref;
    private MemberBasicInfoDto author;
    private String imageUrl;
    private LocalDateTime createdDate, modifiedDate;
    private String content;
    private boolean alreadyLike;
    private int likes;
}