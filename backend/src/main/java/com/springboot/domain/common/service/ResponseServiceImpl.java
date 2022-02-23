package com.springboot.domain.common.service;

import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseServiceImpl implements ResponseService {

    @Override
    public ResponseEntity<ResponseDto> successResult(SuccessCode code) {
        return new ResponseEntity<>(ResponseDto.commonResponse(code),
                HttpStatus.valueOf(code.getStatus()));
    }

    @Override
    public ResponseEntity<ResponseDto> successResult(SuccessCode code, Object body) {
        return new ResponseEntity<>(ResponseDto.commonResponse(code, body),
                HttpStatus.valueOf(code.getStatus()));
    }
}
