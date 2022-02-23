package com.springboot.domain.relation.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.dto.ResponseDto;
import org.springframework.http.ResponseEntity;


public interface RelationService {
    public ResponseEntity<? extends ResponseDto> createRelation(UserDetailsImpl userDetails, Long id);
    public ResponseEntity<? extends ResponseDto> deleteRelation(UserDetailsImpl userDetails, Long id);
}
