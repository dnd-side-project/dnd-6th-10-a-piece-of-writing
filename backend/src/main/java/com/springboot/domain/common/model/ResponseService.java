package com.springboot.domain.common.model;

import org.springframework.http.ResponseEntity;

public interface ResponseService {
    public ResponseEntity<ResponseVo> successResult(SuccessCode code);
    public ResponseEntity<ResponseVo> successResult(SuccessCode code, Object body);
}
