package com.springboot.domain.relation.repository;

import com.springboot.domain.relation.model.Relation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    List<Relation> findAllByFollower(String follower);

    List<Relation> findAllByFollowed(String followed);

    Optional<Relation> findRelationByFollowed(String follower);
}
