package com.springboot.domain.auth.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
        return new UserDetailsImpl(memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found Exception!")));
    }
}
