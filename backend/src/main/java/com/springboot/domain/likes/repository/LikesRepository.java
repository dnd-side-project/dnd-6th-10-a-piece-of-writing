package com.springboot.domain.likes.repository;

import com.springboot.domain.likes.model.Likes;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    void deleteLikesByMemberAndPosts(Member member, Posts posts);
}
