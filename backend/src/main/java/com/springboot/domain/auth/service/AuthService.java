package com.springboot.domain.auth.service;

import com.springboot.domain.auth.model.LoginDto;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    public ResponseEntity<? extends ResponseDto> login(LoginDto loginDto);
    public ResponseEntity<? extends ResponseDto> logout(String accessToken, String refreshTokenUuid);
    public ResponseEntity<? extends ResponseDto> sign(SignDto signDto);
    public ResponseEntity<? extends ResponseDto> withdrawal(UserDetailsImpl userDetailsImpl, String accessToken, String refreshTokenUuid);

    public ResponseEntity<? extends ResponseDto> reissue(String refreshTokenUuid);
}
