package com.springboot.domain.relation.model;

import com.springboot.domain.member.model.Member;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Relation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower", referencedColumnName = "id")
    private Member follower;

    @ManyToOne
    @JoinColumn(name = "followed", referencedColumnName = "id")
    private Member followed;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Relation relation = (Relation) o;
        return Objects.equals(follower.getId(), relation.getFollower().getId())
                && Objects.equals(followed.getId(), relation.getFollowed().getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(follower.getId(), followed.getId());
    }
}
