package com.springboot.domain.member.model;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    Member RequestDtoToMember(MemberDto memberDto);

    MemberDto memberToRequestDto(Member member);
}