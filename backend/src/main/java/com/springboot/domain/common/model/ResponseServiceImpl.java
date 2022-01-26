package com.springboot.domain.common.model;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
public class ResponseServiceImpl implements ResponseService {

    @Override
    public ResponseEntity<ResponseDto> successResult(SuccessCode code) {
        return new ResponseEntity<>(ResponseDto.commonResponse(code.getStatus(), code.getMessage()),
                HttpStatus.valueOf(code.getStatus()));
    }

    @Override
    public ResponseEntity<ResponseDto> successResult(SuccessCode code, Object body) {
        return new ResponseEntity<>(ResponseDto.commonResponse(code.getStatus(), code.getMessage(),
                body),HttpStatus.valueOf(code.getStatus()));
    }
}
