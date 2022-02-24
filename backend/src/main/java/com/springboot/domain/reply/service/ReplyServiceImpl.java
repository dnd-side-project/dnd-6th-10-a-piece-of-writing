package com.springboot.domain.reply.service;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.dto.ReplyResponseDto;
import com.springboot.domain.reply.model.dto.ReplySaveResponseDto;
import com.springboot.domain.reply.model.dto.ReplyUpdateResponseDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final PostsService postsService;
    private final MemberService memberService;

    @Override
    public ReplySaveResponseDto register(ReplyDto replyDTO, Member loginUser) {

        Reply reply = dtoToEntity(replyDTO, loginUser);

        Reply savedReply = replyRepository.save(reply);

        return entityToReplySaveResponseDTO(savedReply, loginUser);
    }

    @Override
    public List<ReplyDto> getFirstList(Long postsId) {

        List<Reply> result = replyRepository
            .getRepliesByPostsOrderByIdLimit3(Posts.builder().id(postsId).build());

        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
    }

    @Override
    public List<ReplyDto> getList(Long postsId) {

        List<Reply> result = replyRepository
//            .getRepliesByPostsOrderById(Posts.builder().id(postsId).build());
            .getRepliesByPostsOrderByIdDesc(Posts.builder().id(postsId).build());

        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
    }

    @Override
    public ReplyUpdateResponseDto modify(Long id, ReplyDto replyDTO, Member loginUser) {

        Reply reply = replyRepository.getById(id);

        reply.changeText(replyDTO.getText());

        reply = replyRepository.save(reply);

        return entityToReplyUpdateResponseDTO(reply, loginUser);
    }

    @Override
    public Long remove(Long id) {

        replyRepository.deleteById(id);

        return id;
    }

    private Reply dtoToEntity(ReplyDto dto, Member loginUser) {

        Posts posts = postsService.findPostsById(dto.getPostsId());

//        Member replyer = memberService.findMemberById(dto.getReplyerId());
        Member replyer = memberService.findMemberById(loginUser.getId());

        Reply reply = Reply.builder()
//            .id(dto.getReplyId())
            .id(dto.getId())
            .text(dto.getText())
            .replyer(replyer)
            .posts(posts)
            .build();

        return reply;
    }
}
