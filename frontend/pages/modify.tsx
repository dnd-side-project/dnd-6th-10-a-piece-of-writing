import React from 'react'

import classNames from 'classnames/bind'
import styled from 'styled-components'

import { Button } from '@/components/button'
import { Label, MainSpan } from '@/components/form/register/RegisterMainForm'
import { GrayInput } from '@/components/input'

type Props = {}

const cx = classNames.bind({})

const Modify: React.FC<Props> = ({}) => {
  return (
    <Container className={cx('Frame')}>
      <MainSpan>
        글 한 조각,
        <br /> 함께 음미해보세요
      </MainSpan>
      <Label>이메일</Label>
      <GrayInput className="w-3/4 h-52" placeholder={'이메일'} value={'email'} onChange={'onChangeEmail'} />
      <Label>비밀번호</Label>
      <GrayInput
        className="w-386 h-52"
        placeholder={'비밀번호'}
        // value={password}
        // onChange={onChangePassword}
        type={'password'}
      />
      <Label>비밀번호 확인</Label>
      <GrayInput
        className="w-386 h-52"
        placeholder={'비밀번호 확인'}
        type={'password'}
        // value={''}
        // onChange={onChangePasswordCheck}
      />
      <Button className={cx('text-white', 'h-52', 'w-386 mt-2')} onClick={'onClickRegister'}>
        회원가입
      </Button>
    </Container>
  )
}

export const Container = styled.div`
  width: 386px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 0;
`

export default Modify
