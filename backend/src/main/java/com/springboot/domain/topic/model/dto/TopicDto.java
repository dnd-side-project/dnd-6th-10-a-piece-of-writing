package com.springboot.domain.topic.model.dto;


import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopicDto {

    @ApiModelProperty(example="1")
    @ApiParam(value = "토픽 아이디")
    private Long topicId;

    @ApiModelProperty(example="TEST1")
    @ApiParam(value = "토픽 이름", required = true)
    private String name;
}
