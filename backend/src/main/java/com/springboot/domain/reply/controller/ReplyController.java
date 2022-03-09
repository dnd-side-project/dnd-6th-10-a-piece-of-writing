package com.springboot.domain.reply.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.dto.ReplyResponseDto;
import com.springboot.domain.reply.model.dto.ReplySaveResponseDto;
import com.springboot.domain.reply.model.dto.ReplyUpdateResponseDto;
import com.springboot.domain.reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/v1/reply")
@Log4j2
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    private final ResponseServiceImpl responseServiceImpl;

    @Operation(summary = "select reply api", description = "모든 댓글 조회 api. 게시물의 id를 보내면 그에 달린 모든 댓글들을 조회한다.")
    @GetMapping(value = "/{postsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> getListByPosts(@PathVariable("postsId") Long postsId) {

        log.info("postsId: " + postsId);

//        List<ReplyDto> replies = replyService.getList(postsId);
        List<ReplyResponseDto> replies = replyService.getList(postsId);

        return responseServiceImpl.successResult(SuccessCode.SELECT_REPLY_SUCCESS, replies);
    }

    @Operation(summary = "select first three reply api", description = "초기 3개 댓글 조회 api. 게시물의 id를 보내면 그에 달린 댓글 3개를 조회한다.")
    @GetMapping(value = "/first/{postsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> getFirstListByPosts(@PathVariable("postsId") Long postsId) {

        log.info("postsId: " + postsId);

//        List<ReplyDto> replies = replyService.getFirstList(postsId);
        List<ReplyResponseDto> replies = replyService.getList(postsId);

        return responseServiceImpl.successResult(SuccessCode.SELECT_FIRST_REPLY_SUCCESS, replies);
    }

    @Operation(summary = "save reply api", description = "댓글 생성 api")
    @PostMapping
    public ResponseEntity<ResponseDto> register(@RequestBody ReplyDto replyDTO,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        log.info(replyDTO);

        Member loginUser = userDetailsImpl.getMember();

        ReplySaveResponseDto savedReplyResponseDto = replyService.register(replyDTO, loginUser);

        return responseServiceImpl.successResult(SuccessCode.SAVE_REPLY_SUCCESS,
            savedReplyResponseDto);
    }

    @Operation(summary = "delete reply api", description = "댓글 삭제 api")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> remove(@PathVariable("id") Long id) {

        log.info("id:" + id);

        Long deletedReplyId = replyService.remove(id);

        return responseServiceImpl.successResult(SuccessCode.DELETE_REPLY_SUCCESS, deletedReplyId);
    }

    @Operation(summary = "modify reply api", description = "댓글 수정 api")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto> modify(@PathVariable("id") Long id,
        @RequestBody ReplyDto replyDTO,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        log.info(replyDTO);

        Member loginUser = userDetailsImpl.getMember();

        ReplyUpdateResponseDto modifiedReplyResponseDto = replyService.modify(id, replyDTO,
            loginUser);

        return responseServiceImpl.successResult(SuccessCode.MODIFY_REPLY_SUCCESS,
            modifiedReplyResponseDto);
    }


}
