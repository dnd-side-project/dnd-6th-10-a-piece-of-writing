package com.springboot.domain.member.model.Dto;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@AllArgsConstructor
public class ModProfileDto {
    @NotNull(message = "파일이 누락됐습니다")
    @ApiModelProperty(example = "image bytes[]")
    private MultipartFile file;
}
