package com.springboot.domain.reply.repository;

import com.springboot.domain.reply.model.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

//    @Modifying
//    @Query("delete from Reply r where r.board.bno =:bno ")
//    void deleteByBno(Long bno);
}
