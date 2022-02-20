package com.springboot.domain.posts.model.entity;


import com.springboot.domain.member.model.Member;
import com.springboot.domain.reply.model.entity.Reply;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "author")
@Entity
public class Posts extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String ref;

//    @ManyToOne (fetch = FetchType.LAZY)
    @ManyToOne (fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    private Member author;

//    @OneToMany(fetch = FetchType.LAZY)
//    private Reply reply;

//    public void setAuthor(Member author) {
//        this.author = author;
//    }

//    public void update(String ref, String content) {
//        this.ref = ref;
//        this.content = content;
//    }
}
