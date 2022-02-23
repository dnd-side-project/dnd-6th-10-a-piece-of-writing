package com.springboot.domain.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.auth.model.LoginDto;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.likes.repository.LikesRepository;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.relation.repository.RelationRepository;
import com.springboot.domain.relation.service.RelationService;
import com.springboot.domain.reply.repository.ReplyRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    // service
    private final ResponseService responseService;
    private final MemberService memberService;
    // repository
    private final RelationRepository relationRepository;
    private final LikesRepository likesRepository;
    private final PostsRepository postsRepository;
    private final ReplyRepository replyRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    private void checkInputHeader(String accessToken, String refreshTokenUuid) {
        if (accessToken == null || refreshTokenUuid == null) {
            throw new BusinessException(ErrorCode.HEADER_MISSING_ERROR);
        }
    }

    @Override
    public ResponseEntity<? extends ResponseDto> login(LoginDto loginDto) {
        Member member = memberService.findMemberByEmail(loginDto.getEmail());

        if (!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            throw new InvalidValueException(ErrorCode.PASSWORD_INPUT_INVALID.getMessage(),
                    ErrorCode.PASSWORD_INPUT_INVALID);
        }
        return responseService.successResult(SuccessCode.LOGIN_SUCCESS,
                jwtUtil.issueJwtTokenBody(member.getEmail()));
    }

    @Override
    public ResponseEntity<? extends ResponseDto> logout(String accessToken,
            String refreshTokenUuid) {
        checkInputHeader(accessToken, refreshTokenUuid);

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);
        return responseService.successResult(SuccessCode.LOGOUT_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> sign(SignDto signDto) {
        Member newMember = Member.builder()
                .email(signDto.getEmail())
                .password(passwordEncoder.encode(signDto.getPassword()))
                .nickname(signDto.getNickname())
                .build();
        Long memberId = memberService.save(newMember).getId();
        valueOperations.set("MP" + memberId, "basic");
        return responseService.successResult(SuccessCode.SIGN_SUCCESS);
    }

    @Override
    @Transactional
    public ResponseEntity<? extends ResponseDto> withdrawal(UserDetailsImpl userDetailsImpl, String accessToken,
            String refreshTokenUuid) {
        checkInputHeader(accessToken, refreshTokenUuid);

        /* 회원 탈퇴 관련 로직
        * - 팔로우 관계 모두 삭제 -> 내가 팔로우로 있던 팔로워로 있던 모두 삭제해야 함
        * - 멤버 댓글 모두 삭제 -> 멤버 id로 삭제
        * - 좋아요 관계 모두 삭제 -> 멤버 id로 삭제
        * - 내 글 모두 삭제 -> 먼저 관계를 정리하고 posts 객체 모두 삭제
        * = 멤버 삭제
        * */
        Long memberId = userDetailsImpl.getMember().getId();
        relationRepository.deleteAllByFollowedId(memberId);
        relationRepository.deleteAllByFollowerId(memberId);
        replyRepository.deleteAllByReplyerId(memberId);
        likesRepository.deleteAllByMemberId(memberId);

        List<Long> postsIdList = postsRepository.findAllByAuthorId(memberId).stream()
                .map(Posts::getId).collect(Collectors.toList());

        postsIdList.forEach(id -> {
            replyRepository.deleteReplyByPostsId(id);
            likesRepository.deleteAllByPostsId(id);
            postsRepository.deletePostsById(id);
        });
        memberService.deleteMemberById(memberId);

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);
        return responseService.successResult(SuccessCode.WITHDRAWAL_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> reissue(String refreshTokenUuid) {

        checkInputHeader("null", refreshTokenUuid);

        String refreshToken = valueOperations.get(refreshTokenUuid);
        if (refreshToken != null) {
            DecodedJWT verifiedToken = JWT.require(jwtUtil.getAlgorithm()).build()
                    .verify(refreshToken);
            String accessToken = jwtUtil.createAuthToken(verifiedToken.getSubject());

            Map<String, String> body = new HashMap<>();
            body.put("access-token", accessToken);
            return responseService.successResult(SuccessCode.REISSUE_SUCCESS, body);
        }
        redisTemplate.delete(refreshTokenUuid);
        throw new BusinessException(ErrorCode.EXPIRED_REFRESH_TOKEN);
    }
}
