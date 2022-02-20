package com.springboot.domain.reply.repository;

import com.springboot.domain.reply.model.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @Modifying
    @Query("delete from Reply r where r.posts.id =:id ")
    void deleteById(Long id);
}
