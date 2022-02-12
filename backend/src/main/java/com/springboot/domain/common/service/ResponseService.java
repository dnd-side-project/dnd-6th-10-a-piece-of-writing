package com.springboot.domain.common.service;

import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import org.springframework.http.ResponseEntity;

public interface ResponseService {
    public ResponseEntity<ResponseDto> successResult(SuccessCode code);
    public ResponseEntity<ResponseDto> successResult(SuccessCode code, Object body);
}
