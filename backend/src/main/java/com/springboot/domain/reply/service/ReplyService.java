package com.springboot.domain.reply.service;

import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.dto.ReplyResponseDto;
import com.springboot.domain.reply.model.dto.ReplySaveResponseDto;
import com.springboot.domain.reply.model.dto.ReplyUpdateResponseDto;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;

public interface ReplyService {

    ReplySaveResponseDto register(ReplyDto replyDTO, Member loginUser); //댓글의 등록

//    List<ReplyDto> getFirstList(Long postsId); //특정 게시물의 초기 댓글 목록
    List<ReplyResponseDto> getFirstList(Long postsId); //특정 게시물의 초기 댓글 목록

//    List<ReplyDto> getList(Long postsId); //특정 게시물의 모든 댓글 목록
    List<ReplyResponseDto> getList(Long postsId); //특정 게시물의 모든 댓글 목록

    ReplyUpdateResponseDto modify(Long id, ReplyDto replyDTO, Member loginUser); //댓글 수정

    Long remove(Long id); //댓글 삭제

    //ReplyDTO를 Reply 객체로 변환 Posts 객체의 처리가 수반됨


    //Reply객체를 ReplyResponseDto로 변환
    default ReplyResponseDto entityToDTO(Reply reply) {

        MemberBasicInfoDto replyerInfo = MemberBasicInfoDto.builder()
            .id(reply.getReplyer().getId())
            .nickname(reply.getReplyer().getNickname())
            .profileUrl(reply.getReplyer().getProfileUrl())
            .build();

        ReplyResponseDto dto = ReplyResponseDto.builder()
            .replyId(reply.getId())
            .text(reply.getText())
            .replyer(replyerInfo)
            .createdDate(reply.getCreatedDate())
            .modifiedDate(reply.getModifiedDate())
            .build();

        return dto;

    }

    // entity to ReplySaveResponseDTO
    default ReplySaveResponseDto entityToReplySaveResponseDTO(Reply reply, Member loginUser) {

        MemberBasicInfoDto replyerInfo = MemberBasicInfoDto.entityTOdto(loginUser);

        ReplySaveResponseDto dto = ReplySaveResponseDto.builder()
            .replyId(reply.getId())
            .text(reply.getText())
            .replyer(replyerInfo)
            .createdDate(reply.getCreatedDate())
            .build();

        return dto;

    }

    // entity to ReplyUpdateResponseDTO
    default ReplyUpdateResponseDto entityToReplyUpdateResponseDTO(Reply reply, Member loginUser) {

        MemberBasicInfoDto replyerInfo = MemberBasicInfoDto.entityTOdto(loginUser);

        ReplyUpdateResponseDto dto = ReplyUpdateResponseDto.builder()
            .replyId(reply.getId())
            .text(reply.getText())
            .replyer(replyerInfo)
            .modifiedDate(reply.getModifiedDate())
            .build();

        return dto;

    }

}
