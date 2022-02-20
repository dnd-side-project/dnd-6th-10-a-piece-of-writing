package com.springboot.domain.relation.service;

import com.springboot.domain.common.model.ResponseDto;
import org.springframework.http.ResponseEntity;


public interface RelationService {
    public ResponseEntity<? extends ResponseDto> createRelation(String followerNickname, String followedNickname);
}
