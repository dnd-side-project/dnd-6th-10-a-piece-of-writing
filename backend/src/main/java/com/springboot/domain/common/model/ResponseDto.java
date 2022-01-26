package com.springboot.domain.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor
public class ResponseDto {
    private int status;
    private Object data;

    public static ResponseDto commonResponse(int status, String msg) {
        return new ResponseDto(status, new Object());
    }
    public static ResponseDto commonResponse(int status, String msg, Object object) {
        return new ResponseDto(status, object);
    }
}