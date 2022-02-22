package com.springboot.domain.relation.model;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ModRelationDto {

    @ApiModelProperty(example = "13")
    @NotBlank(message = "팔로우 타겟 id가 누락됐습니다")
    private Long followed;
}
