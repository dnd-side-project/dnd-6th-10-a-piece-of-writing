package com.springboot.domain.relation.repository;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.relation.model.Relation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    Optional<Relation> findRelationByFollowedAndFollower(Member followed, Member follower);
}
