package com.springboot.domain.reply;


import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void insertMembers() {

        IntStream.rangeClosed(101, 300).forEach(i -> {

            Member member = Member.builder()
                    .email("user" + i + "@aaa.com")
                    .password("1111")
                    .nickname("USER" + i)
                    .build();

            memberRepository.save(member);
        });
    }
}