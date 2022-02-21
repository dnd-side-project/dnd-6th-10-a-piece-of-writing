package com.springboot.domain.relation.model;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CreateRelationDto {

    @ApiModelProperty(example = "tester")
    @NotBlank(message = "팔로워 닉네임이 누락됐습니다")
    private String follower;

    @ApiModelProperty(example = "블랙핑크")
    @NotBlank(message = "팔로우 타겟 닉네임이 누락됐습니다")
    private String followed;
}
