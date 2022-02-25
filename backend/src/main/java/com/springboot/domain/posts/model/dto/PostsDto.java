package com.springboot.domain.posts.model.dto;


import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostsDto {

    // Posts Info
    private Long postsId;

    private String ref;

    private String content;

    private String imageUrl;

    private MemberBasicInfoDto authorInfo;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private boolean alreadyLike;
}
