package com.springboot.domain.category;

import com.springboot.domain.category.model.entity.Category;
import com.springboot.domain.category.repository.CategoryRepository;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import java.util.List;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CategoryRepositoryTest {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private final Logger logger = (Logger) LoggerFactory.getLogger(CategoryRepositoryTest.class);

//    @DisplayName("Category 테스트 데이터 삽입")
//    @Test
//    @Transactional
//    public void insertCategory() {
//
//        IntStream.rangeClosed(1, 100).forEach(i -> {
//
//            long topicId = (long) (Math.random() * 300) + 1;
//
//            Topic topic = topicRepository.getById(topicId);
//
//            long postsId = (long) (Math.random() * 90) + 207;
//
//            Posts posts = postsRepository.getById(postsId);
//
//            Category category = Category.builder()
//                .topic(topic)
//                .posts(posts)
//                .build();
//
//            categoryRepository.save(category);
//
//        });
//
//    }

//


}
