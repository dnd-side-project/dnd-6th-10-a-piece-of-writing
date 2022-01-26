package com.springboot.domain.auth.jwt;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TokenResult {

    private String iss;
    private String name;
    private String type;
    private Date exp;
    private boolean success;
}