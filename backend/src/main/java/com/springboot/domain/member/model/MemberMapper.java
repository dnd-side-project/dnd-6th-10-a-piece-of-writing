package com.springboot.domain.member.model;

import com.springboot.domain.common.model.RequestDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    Member RequestDtoToMember(RequestDto requestDto);

    RequestDto memberToRequestDto(Member member);
}