import React, { useState } from 'react'

import classNames from 'classnames/bind'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import styled from 'styled-components'

import { setNicknameAtom } from '@/atom/user/me'
import { Button } from '@/components/button'
import { Label, MainSpan } from '@/components/form/register/RegisterMainForm'
import { GrayInput } from '@/components/input'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { registerMessageAtom, useRegister } from '@/hook/usePassword'
import { useSsrMe } from '@/hook/useSsrMe'
import { modifyUser } from '@/server/user'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType }

const cx = classNames.bind({})

const Modify: React.FC<ServerSideProps> = ({ me }) => {
  useSsrMe(me)
  // useNeedLogin()
  const message = useAtomValue(registerMessageAtom)
  const [nickname, setNickname] = useState(me?.nickname ?? '')
  const { password, checkPassword, passwordCheck, onChangePassword, onChangePasswordCheck } = useRegister()
  const setMeNickname = useUpdateAtom(setNicknameAtom)

  const onClickModify = async () => {
    if (!checkPassword()) {
      return
    }
    const result = await modifyUser(nickname)
    alert(result.message)
    if (result.success && me) {
      setMeNickname(result.data)
      return
    }
  }

  return (
    <div className={`${CENTER_FLEX} px-4`}>
      <Container>
        <MainSpan>
          당신의 닉네임을
          <br /> 수정합니다.
        </MainSpan>
        <Label>사용할 닉네임</Label>
        <GrayInput
          className="w-3/4 h-52"
          placeholder={'닉네임을 입력하세요'}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value)
          }}
          maxLength={30}
        />
        <Label>비밀번호</Label>
        <GrayInput
          className="w-386 h-52"
          placeholder={'비밀번호'}
          value={password}
          onChange={onChangePassword}
          type={'password'}
          maxLength={20}
        />
        <div className={cx('w-full', 'text-red-400', 'mb-1')}>{message.password}</div>
        <Label>비밀번호 확인</Label>
        <GrayInput
          className="w-386 h-52"
          placeholder={'비밀번호 확인'}
          type={'password'}
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          maxLength={20}
        />
        <div className={cx('w-full', 'text-red-400', 'mb-1')}>{message.passwordCheck}</div>
        <FlexDiv>
          <Button className={cx('text-white', 'h-52', 'w-386 mt-2')} onClick={onClickModify}>
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

export const getServerSideProps = withAuthServerSideProps()

export default Modify
