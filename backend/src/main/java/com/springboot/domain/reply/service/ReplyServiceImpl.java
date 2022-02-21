package com.springboot.domain.reply.service;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.dto.ReplyDto;
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

    @Override
    public Long register(ReplyDto replyDTO) {

        Reply reply = dtoToEntity(replyDTO);

        replyRepository.save(reply);

        return reply.getId();
    }

    @Override
    public List<ReplyDto> getList(Long postsId) {

        List<Reply> result =  replyRepository
                .getRepliesByPostsOrderById(Posts.builder().id(postsId).build());

        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
    }

    @Override
    public Long modify(ReplyDto replyDTO) {

        Reply reply = replyRepository.getById(replyDTO.getId());

        if(reply != null) {

            reply.changeText(replyDTO.getText());

            replyRepository.save(reply);
        }

//        Reply reply = dtoToEntity(replyDTO);

//        replyRepository.save(reply);

        return reply.getId();
    }

    @Override
    public Long remove(Long id) {

        replyRepository.deleteById(id);

        return id;
    }
}
