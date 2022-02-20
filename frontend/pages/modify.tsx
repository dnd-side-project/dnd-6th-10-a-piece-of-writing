import React from 'react'

import classNames from 'classnames/bind'
import { useAtomValue } from 'jotai/utils'
import styled from 'styled-components'

import { meAtom } from '@/atom/user/me'
import { Button } from '@/components/button'
import { Label, MainSpan } from '@/components/form/register/RegisterMainForm'
import { GrayInput } from '@/components/input'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import useNeedLogin from '@/hook/useNeedLogin'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const cx = classNames.bind({})

const Modify: React.FC<Props> = ({}) => {
  useNeedLogin()
  const me = useAtomValue(meAtom)

  if (!me) {
    return null
  }

  return (
    <div className={`${CENTER_FLEX} px-4`}>
      <Container>
        <MainSpan>
          글 한 조각,
          <br /> 함께 음미해보세요
        </MainSpan>
        <Label>사용할 닉네임</Label>
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
        <FlexDiv>
          <Button className={cx('text-white', 'h-52', 'w-386 mt-2')} onClick={'onClickRegister'}>
            저장하기
          </Button>
        </FlexDiv>
      </Container>
    </div>
  )
}

export const Container = styled.div`
  max-width: 386px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 0;
`

export default Modify
