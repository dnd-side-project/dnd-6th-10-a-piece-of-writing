package com.springboot.domain.reply.model.entity;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.BaseTime;
import com.springboot.domain.posts.model.entity.Posts;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "posts")
public class Reply extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    // MemberId로 변경 예정
//    @ManyToOne
//    private Member replyer;

//    private String replyer;

    @ManyToOne
    @JoinColumn(name = "replyer_id")
    private Member replyer;

    @ManyToOne
    @JoinColumn(name = "posts_id")
    private Posts posts;

}
