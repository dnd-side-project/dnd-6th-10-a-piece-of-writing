package com.springboot.domain.topic.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.service.ReplyService;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.service.TopicService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/v1/topic")
@Log4j2
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    private final ResponseServiceImpl responseServiceImpl;

    @ApiOperation(
        value = "토픽 생성 api"
        , notes = "name으로 토픽 엔티티를 생성하고 생성된 토픽 객체를 반환한다.")
    @ApiImplicitParam(
        name = "name"
        , value = "토픽 이름"
        , required = true
        , paramType = "body"
        , dataType = "ProjectName"
        , defaultValue = "None")
    @PostMapping
    public ResponseEntity<ResponseDto> register(@RequestBody TopicDto topicDTO) {

        log.info(topicDTO);

        TopicDto savedTopicDto = topicService.register(topicDTO);

        return responseServiceImpl.successResult(SuccessCode.SAVE_TOPIC_SUCCESS, savedTopicDto);
    }

    @ApiOperation(
        value = "토픽 목록 조회 api"
        , notes = "인기순으로 10개의 토픽 목록을 반환한다.")
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> getTop10Topics() {

        List<TopicDto> topicDtos = topicService.getTop10TopicList();

        return responseServiceImpl.successResult(SuccessCode.SELECT_TOP_TEN_TOPICS_SUCCESS, topicDtos);
    }

    @ApiOperation(
        value = "토픽 검색 api"
        , notes = "keyword를 포함한 토픽 객체 목록을 반환한다.")
    @ApiImplicitParam(
        name = "keyword"
        , value = "토픽 검색 키워드"
        , required = true
        , dataType = "string"
        , paramType = "path"
        , defaultValue = "None")
    @GetMapping("/search/{keyword}")
    public ResponseEntity<ResponseDto> search(@PathVariable String keyword) {

        List<TopicDto> topicDtos = topicService.searchKeyword(keyword);

        return responseServiceImpl.successResult(SuccessCode.SEARCH_TOPIC_SUCCESS, topicDtos);
    }

    @ApiOperation(
        value = "게시물 토픽 조회 api"
        , notes = "postsId의 게시물이 가진 토픽 목록을 반환한다.")
    @ApiImplicitParam(
        name = "postsId"
        , value = "게시물 아이디"
        , required = true
        , dataType = "long"
        , paramType = "path"
        , defaultValue = "None")
    @GetMapping("/posts/{postsId}")
    public ResponseEntity<ResponseDto> selectTopicsByPosts(@PathVariable Long postsId) {

        List<TopicDto> topicDtos = topicService.getTopicList(postsId);

        return responseServiceImpl.successResult(SuccessCode.SELECT_ALL_TOPIC_ON_POSTS_SUCCESS, topicDtos);
    }
}
