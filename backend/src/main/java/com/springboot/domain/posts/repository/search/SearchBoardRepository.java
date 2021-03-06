package com.springboot.domain.posts.repository.search;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchBoardRepository {

    Page<Object[]> searchPage(String type, String keyword, Long topicId, Pageable pageable);

}
