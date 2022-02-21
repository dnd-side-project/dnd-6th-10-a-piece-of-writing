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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @Operation(summary = "닉네임 설정 api", description = "닉네임 변경 api")
    @PatchMapping(value = "/nickname/{nickname}")
    public ResponseEntity<? extends ResponseDto> modNickname(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Parameter(description = "닉네임", required = true) @PathVariable @NotBlank String nickname) {
        return memberService.modNickname(userDetailsImpl, nickname);
    }

    @Operation(summary = "프로필 변경 api", description = "프로필 사진 변경 api")
    @PostMapping(value = "/profile")
    public ResponseEntity<? extends ResponseDto> modProfile(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Valid ModProfileDto modProfileDto) {
        return memberService.modProfile(modProfileDto, userDetailsImpl);
    }

    @Operation(summary = "내 프로필 조회 api", description = "프로필 조회 api")
    @GetMapping(value = "/profile")
    public ResponseEntity<? extends ResponseDto> getMyProfile(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return memberService.getMyProfile(userDetailsImpl);
    }

    @Operation(summary = "프로필 조회 api", description = "프로필 조회 api")
    @GetMapping(value = "/profile/{id}")
    public ResponseEntity<? extends ResponseDto> getMemberProfile(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Parameter(description = "유저 id", required = true) @PathVariable Long id) {
        return memberService.getMemberProfile(userDetailsImpl, id);
    }

    @Operation(summary = "팔로우 목록 조회 api", description = "팔로우 목록 조회 api")
    @GetMapping(value = "/follow/list/{id}")
    public ResponseEntity<? extends ResponseDto> getFollowList(
            @Parameter(description = "유저 id", required = true) @PathVariable Long id) {
        return memberService.getFollowList(id);
    }

    @Operation(summary = "팔로워 목록 조회 api", description = "팔로워 목록 조회 api")
    @GetMapping(value = "/follower/list/{id}")
    public ResponseEntity<? extends ResponseDto> getFollowerList(
            @Parameter(description = "유저 id", required = true) @PathVariable Long id) {
        return memberService.getFollowerList(id);
    }

    @Operation(summary = "내 글 목록 조회 api", description = "내 글 목록 조회 api")
    @GetMapping(value = "/posts/list")
    public ResponseEntity<? extends ResponseDto> getMyPostsList(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return memberService.getMyPostsList(userDetailsImpl);
    }

    @Operation(summary = "내 좋아요 목록 조회 api", description = "내 좋아요 목록 조회 api")
    @GetMapping(value = "/like/list")
    public ResponseEntity<? extends ResponseDto> getMyLikesList(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return memberService.getMyLikesList(userDetailsImpl);
    }
}