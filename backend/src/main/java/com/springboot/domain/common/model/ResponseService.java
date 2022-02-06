package com.springboot.domain.common.model;

import org.springframework.http.ResponseEntity;

public interface ResponseService {
    public ResponseEntity<ResponseDto> successResult(SuccessCode code);
    public ResponseEntity<ResponseDto> successResult(SuccessCode code, Object body);
}
