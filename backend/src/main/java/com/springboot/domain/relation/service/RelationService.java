package com.springboot.domain.relation.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import org.springframework.http.ResponseEntity;


public interface RelationService {
    public ResponseEntity<? extends ResponseDto> createRelation(UserDetailsImpl userDetailsImpl, Long id);
    public ResponseEntity<? extends ResponseDto> deleteRelation(UserDetailsImpl userDetailsImpl, Long id);
}
