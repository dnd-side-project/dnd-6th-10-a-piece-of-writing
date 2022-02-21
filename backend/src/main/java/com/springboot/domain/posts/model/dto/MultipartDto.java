package com.springboot.domain.posts.model.dto;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@AllArgsConstructor
public class MultipartDto {
    @NotNull
    @ApiModelProperty(example = "image bytes[]")
    private MultipartFile file;
}
