package com.springboot.domain.auth.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberInfoDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
