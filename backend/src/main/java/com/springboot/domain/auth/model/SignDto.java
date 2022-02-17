package com.springboot.domain.auth.model;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@AllArgsConstructor
public class SignDto {
    @ApiModelProperty(example = "tester@gmail.com")
    @NotBlank(message = "email이 입력되지 않았습니다")
    @Email(message = "email 형식이 올바르지 않습니다")
    private String email;

    @ApiModelProperty(example = "12345678")
    @NotBlank(message = "비밀번호가 입력되지 않았습니다")
    @Length(min = 8, max = 20, message = "8~20 글자의 비밀번호여야 합니다")
    private String password;

    @NotBlank(message = "닉네임이 입력되지 않았습니다")
    @Length(min = 2, max = 12, message = "2~12 글자의 닉네임이어야 합니다")
    private String nickname;
}
