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
    private String message;
    private Object data;

    public static ResponseDto commonResult() {
        return new ResponseDto(200, "request success", new Object());
    }
    public static ResponseDto commonResult(Object object) {
        return new ResponseDto(200, "request success", object);
    }
}