package com.springboot.domain.relation.controller;

import com.springboot.domain.relation.model.CreateRelationDto;
import com.springboot.domain.relation.service.RelationService;
import io.swagger.v3.oas.annotations.Operation;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/relation")
public class RelationController {
    private final RelationService relationService;

    @Operation(summary = "add relation api", description = "팔로우 관계 추가 api")
    @PostMapping
    public ResponseEntity<?> modProfile(@RequestBody @Valid CreateRelationDto createRelationDto) {
        return relationService.createRelation(createRelationDto.getFollower(), createRelationDto.getFollowed());
    }
}