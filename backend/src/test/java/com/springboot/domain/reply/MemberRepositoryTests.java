package com.springboot.domain.reply;


import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @Transactional
    public void insertMembers() {

        IntStream.rangeClosed(1, 100).forEach(i -> {

            Member member = Member.builder()
                .id((long) i)
                .email("user" + i + "@aaa.com")
                .password("1111")
                .nickname("USER" + i)
                .build();

            memberRepository.save(member);
        });
    }
}