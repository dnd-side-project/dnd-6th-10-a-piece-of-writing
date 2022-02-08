package com.springboot.domain.member.repository;

import java.util.Optional;
import com.springboot.domain.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findMemberByEmail(String email);

    Member findMemberByNickname(String nickname);
}