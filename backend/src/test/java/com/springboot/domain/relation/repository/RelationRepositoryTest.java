package com.springboot.domain.relation.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.springboot.domain.relation.model.Relation;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RelationRepositoryTest {
    @Autowired
    RelationRepository relationRepository;

    @DisplayName("Relation 저장, 조회 테스트")
    @Test
    void getFollowListTest() {
    }
}