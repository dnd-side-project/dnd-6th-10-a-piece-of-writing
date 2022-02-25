package com.springboot.domain.likes.repository;

import com.springboot.domain.likes.model.Likes;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    void deleteLikesByMemberIdAndPostsId(Long MemberId, Long PostsId);

    List<Likes> getAllByMemberId(Long memberId);

    void deleteAllByPostsId(Long postsId);

    void deleteAllByMemberId(Long memberId);
}
