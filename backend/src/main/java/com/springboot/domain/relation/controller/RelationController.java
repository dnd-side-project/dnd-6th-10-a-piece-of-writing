package com.springboot.domain.relation.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.relation.model.ModRelationDto;
import com.springboot.domain.relation.service.RelationService;
import io.swagger.v3.oas.annotations.Operation;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/relation")
public class RelationController {
    private final RelationService relationService;

    @Operation(summary = "팔로우 추가 api", description = "id는 유저의 id이다")
    @PostMapping(value = "/follow/{id}")
    public ResponseEntity<?> createRelation(@PathVariable("id") Long id,
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return relationService.createRelation(userDetailsImpl, id);
    }

    @Operation(summary = "언팔 api", description = "id는 유저의 id이다")
    @DeleteMapping(value = "/follow/{id}")
    public ResponseEntity<?> deleteRelation(@PathVariable("id") Long id,
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return relationService.deleteRelation(userDetailsImpl, id);
    }
}