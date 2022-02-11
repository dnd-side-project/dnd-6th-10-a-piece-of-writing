package com.springboot.domain.common.model;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ResponseDto {
    private int status;
    private String message;
    private String code;
    private Object data;

    public static ResponseDto commonResponse(SuccessCode code) {
        return new ResponseDto(code.getStatus(), code.getMessage(), code.getCode(), new ArrayList<>());
    }
    public static ResponseDto commonResponse(SuccessCode code, Object body) {
        return new ResponseDto(code.getStatus(), code.getMessage(), code.getCode(), body);
    }
}