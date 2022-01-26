package com.springboot.domain.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ResponseVo {
    private int status;
    private Object data;

    public static ResponseVo commonResponse(int status, String msg) {
        return new ResponseVo(status, new Object());
    }
    public static ResponseVo commonResponse(int status, String msg, Object object) {
        return new ResponseVo(status, object);
    }
}