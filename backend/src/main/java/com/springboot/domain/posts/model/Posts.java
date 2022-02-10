package com.springboot.domain.posts.model;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
//public class Posts extends BaseTimeEntity{
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(length=500,nullable = false)
//    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String reference;

    @Builder
    public Posts(String content, String author, String reference){
//    public Posts(String title, String content, String author){
//        this.title=title;
        this.content = content;
        this.author = author;
        this.reference = reference;
    }

//    public void update(String title, String content){
//        this.title=title;
//        this.content=content;
//    }
}
