package com.springboot.domain.reply.controller;

import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reply")
@Log4j2
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    private final ResponseServiceImpl responseServiceImpl;

    @Operation(summary = "select reply api", description = "댓글 조회 api")
    @GetMapping(value = "/{postsId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto> getListByPosts(@PathVariable("postsId") Long postsId) {

        log.info("postsId: " + postsId);

        List<ReplyDto> replies = replyService.getList(postsId);

//        return new ResponseEntity<>( replyService.getList(postsId), HttpStatus.OK);
        return responseServiceImpl.successResult(SuccessCode.SELECT_REPLY_SUCCESS, replies);
    }

    @Operation(summary = "save reply api", description = "댓글 생성 api")
    @PostMapping
    public ResponseEntity<ResponseDto> register(@RequestBody ReplyDto replyDTO) {

        log.info(replyDTO);

        Long saveReplyId = replyService.register(replyDTO);

//        return new ResponseEntity<>(id, HttpStatus.OK);
        return responseServiceImpl.successResult(SuccessCode.SAVE_REPLY_SUCCESS, saveReplyId);
    }

    @Operation(summary = "delete reply api", description = "댓글 삭제 api")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> remove(@PathVariable("id") Long id) {

        log.info("id:" + id);

        Long deletedReplyId = replyService.remove(id);

//        return new ResponseEntity<>("success", HttpStatus.OK);
        return responseServiceImpl.successResult(SuccessCode.DELETE_REPLY_SUCCESS, deletedReplyId);
    }

    @Operation(summary = "modify reply api", description = "댓글 수정 api")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto> modify(@RequestBody ReplyDto replyDTO) {

        log.info(replyDTO);

        long modifiedReplyId = replyService.modify(replyDTO);

//        return new ResponseEntity<>("success", HttpStatus.OK);
        return responseServiceImpl.successResult(SuccessCode.MODIFY_REPLY_SUCCESS, modifiedReplyId);
    }


}
