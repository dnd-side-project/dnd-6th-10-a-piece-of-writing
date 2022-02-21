package com.springboot.domain.reply.repository;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    // Posts 삭제 시 댓글 삭제
    @Modifying
    @Query("delete from Reply r where r.posts.id =:id ")
    void deleteById(Long id);

    // 게시물로 댓글 조회
    List<Reply> getRepliesByPostsOrderById(Posts posts);
}
