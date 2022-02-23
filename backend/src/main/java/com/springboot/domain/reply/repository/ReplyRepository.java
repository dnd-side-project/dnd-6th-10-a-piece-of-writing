package com.springboot.domain.reply.repository;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    // Posts 삭제 시 댓글 삭제
    void deleteReplyByPostsId(Long id);

    void deleteAllByReplyerId(Long id);

    // 게시물로 댓글 전체 조회
    List<Reply> getRepliesByPostsOrderByIdDesc(Posts posts);

    // 게시물로 댓글 초기 3개 조회
    @Query(value = "select * from Reply r "
        + "order by r.id desc "
        + "limit 3", nativeQuery = true)
    List<Reply> getRepliesByPostsOrderByIdLimit3(Posts posts);

    List<Reply> findAllByOrderByIdDesc();
}
