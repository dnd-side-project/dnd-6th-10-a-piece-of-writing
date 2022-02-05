package com.springboot.domain.auth.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class LoginDto {

    @NotBlank(message = "email이 입력되지 않았습니다")
    @Email(message = "email 형식이 올바르지 않습니다")
    private String email;

    @NotBlank(message = "비밀번호가 입력되지 않았습니다")
    private String password;
}
