package com.springboot.domain.reply.service;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;

public interface ReplyService {

    Long register(ReplyDto replyDTO); //댓글의 등록

    List<ReplyDto> getFirstList(Long postsId); //특정 게시물의 초기 댓글 목록

    List<ReplyDto> getList(Long postsId); //특정 게시물의 모든 댓글 목록

    Long modify(Long id, ReplyDto replyDTO); //댓글 수정

    Long remove(Long id); //댓글 삭제

    //ReplyDTO를 Reply 객체로 변환 Posts 객체의 처리가 수반됨


    //Reply객체를 ReplyDTO로 변환 Posts 객체가 필요하지 않으므로 게시물 번호만
    default ReplyDto entityToDTO(Reply reply) {

        ReplyDto dto = ReplyDto.builder()
            .id(reply.getId())
            .text(reply.getText())
            .replyerId(reply.getReplyer().getId())
            .replyerEmail(reply.getReplyer().getEmail())
            .replyerNickname(reply.getReplyer().getNickname())
            .createdDate(reply.getCreatedDate())
            .modifiedDate(reply.getModifiedDate())
            .build();

        return dto;

    }

}
