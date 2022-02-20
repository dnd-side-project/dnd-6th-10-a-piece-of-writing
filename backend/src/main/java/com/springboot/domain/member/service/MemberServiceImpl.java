package com.springboot.domain.member.service;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Acl.Role;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.EntityNotFoundException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.member.model.Dto.FollowListDto;
import com.springboot.domain.member.model.Dto.MemberProfileDto;
import com.springboot.domain.member.model.Dto.ModProfileDto;
import com.springboot.domain.member.model.Dto.MyProfileDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.service.PostsService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ResponseService responseService;
    private final PostsService postsService;
    private final ValueOperations<String, String> valueOperations;

    @Override
    public Member findMemberById(Long id) {
        return memberRepository.findMemberById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Member findMemberByEmail(String email) {
        return memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Member findMemberByNickname(String nickname) {
        return memberRepository.findMemberByNickname(nickname)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public void deleteMemberByEmail(Member member) {
        memberRepository.delete(member);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> getMyProfile(UserDetailsImpl userDetailsImpl) {
        return responseService.successResult(SuccessCode.GET_PROFILE_SUCCESS,
                MyProfileDto.memberToDto(userDetailsImpl.getMember()));
    }

    @Override
    public ResponseEntity<? extends ResponseDto> modNickname(
            UserDetailsImpl userDetailsImpl, String nickname) {
        Member member = findMemberByNickname(userDetailsImpl.getNickname());
        member.setNickname(nickname);
        return responseService.successResult(SuccessCode.MOD_NICKNAME_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(String nickname) {
        if (memberRepository.findMemberByNickname(nickname).isPresent()) {
            throw new BusinessException(ErrorCode.NICKNAME_DUPLICATION);
        }
        return responseService.successResult(SuccessCode.NICKNAME_DUPLICATION_CHECK_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(String email) {
        if (memberRepository.findMemberByEmail(email).isPresent()) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATION);
        }
        return responseService.successResult(SuccessCode.EMAIL_DUPLICATION_CHECK_SUCCESS);
    }

    @Override
    public String profileImgUpload(MultipartFile multipartFile, String id) {
        try {
            byte[] bytes = multipartFile.getBytes();
            String projectId = "decent-destiny-321408";
            String bucketName = "example-ocr-test";
            String fileName = postsService.getFileUuid();
            Storage storage = StorageOptions.newBuilder().setProjectId(projectId)
                    .setCredentials(postsService.getCredentials()).build().getService();

            BlobId blobId = BlobId.of(bucketName, valueOperations.get(id));
            storage.delete(blobId);
            valueOperations.set(id, fileName);

            blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();
            storage.create(blobInfo, bytes); // 새로운 프로필 생성
            storage.createAcl(blobId, Acl.of(Acl.User.ofAllUsers(), Role.READER));

            return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.IMAGE_INPUT_INVALID);
        }
    }

    @Override
    public ResponseEntity<? extends ResponseDto> modProfile(ModProfileDto modProfileDto,
            UserDetailsImpl userDetailsImpl) {
        String profileUrl = profileImgUpload(
                modProfileDto.getFile(),
                "MP" + userDetailsImpl.getMember().getId());
        Member member = findMemberByNickname(userDetailsImpl.getNickname());
        member.setProfileUrl(profileUrl);

        return responseService.successResult(SuccessCode.MOD_PROFILE_SUCCESS, profileUrl);
    }

    private boolean alreadyFollow(UserDetailsImpl userDetailsImpl, Long memberId) {
        return userDetailsImpl.getMember().getFollower().stream()
                .anyMatch(R -> R.getFollowed().getId() == memberId);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> getMemberProfile(UserDetailsImpl userDetailsImpl,
            String nickname) {
        Member member = findMemberByNickname(nickname);
        MemberProfileDto memberProfileDto = MemberProfileDto.builder()
                .id(member.getId())
                .nickname(nickname)
                .profileUrl(member.getProfileUrl())
                .email(member.getEmail())
                .follow(member.getFollowCount())
                .follower(member.getFollowerCount())
                .alreadyFollow(alreadyFollow(userDetailsImpl, member.getId()))
                .build();

        return responseService.successResult(SuccessCode.GET_PROFILE_SUCCESS, memberProfileDto);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> getFollowList(String nickname) {
        if (nickname == null) {
            throw new BusinessException(ErrorCode.PARAMETER_MISSING_ERROR);
        }
        List<FollowListDto> data = new ArrayList<>();
        Member member = findMemberByNickname(nickname);
        member.getFollower().forEach(R -> {
            data.add(FollowListDto.entityToDto(findMemberById(R.getFollowed().getId())));
        });
        return responseService.successResult(SuccessCode.GET_FOLLOW_LIST_SUCCESS, data);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> getFollowerList(String nickname) {
        if (nickname == null) {
            throw new BusinessException(ErrorCode.PARAMETER_MISSING_ERROR);
        }
        List<FollowListDto> data = new ArrayList<>();
        Member member = findMemberByNickname(nickname);
        member.getFollowed().forEach(R -> {
            data.add(FollowListDto.entityToDto(findMemberById(R.getFollower().getId())));
        });
        return responseService.successResult(SuccessCode.GET_FOLLOWER_LIST_SUCCESS, data);
    }
}