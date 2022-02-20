package com.springboot.domain.member.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.member.model.Dto.ModProfileDto;
import com.springboot.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "nickname patch api", description = "닉네임 변경 api \npath에 nickname 필요")
    @PatchMapping(value = "/nickname/{nickname}")
    public ResponseEntity<?> modNickname(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Parameter(description = "닉네임", required = true) @PathVariable @NotBlank String nickname) {
        return memberService.modNickname(userDetailsImpl, nickname);
    }

    @Operation(summary = "profile change api", description = "프로필 사진 변경 api")
    @PostMapping(value = "/profile")
    public ResponseEntity<?> modProfile(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Valid ModProfileDto modProfileDto) {
        return memberService.modProfile(modProfileDto, userDetailsImpl);
    }

    @Operation(summary = "get profile api", description = "프로필 조회 api")
    @GetMapping(value = "/profile/{nickname}")
    public ResponseEntity<?> getMemberProfile(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Parameter(description = "닉네임", required = true) @PathVariable @NotBlank String nickname) {
        return memberService.getMemberProfile(userDetailsImpl, nickname);
    }

    @Operation(summary = "팔로우 목록 api", description = "팔로우 목록 조회 api, path에 nickname 필요")
    @GetMapping(value = "/follow/list/{nickname}")
    public ResponseEntity<? extends ResponseDto> getFollowList(
            @Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        return memberService.getFollowList(nickname);
    }

    @Operation(summary = "팔로워 목록 api", description = "팔로워 목록 조회 api, path에  nickname 필요")
    @GetMapping(value = "/follower/list/{nickname}")
    public ResponseEntity<? extends ResponseDto> getFollowerList(
            @Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        return memberService.getFollowerList(nickname);
    }
}