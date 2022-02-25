package com.springboot.domain.posts.model.dto;


import com.springboot.domain.topic.model.entity.Topic;
import java.time.LocalDateTime;
import java.util.List;
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
public class PostsSaveRequestDto {

    // Posts Info
    private String ref;

    private String content;

    private Long authorId; //Author id

    private List<Long> topicIdList;
}
