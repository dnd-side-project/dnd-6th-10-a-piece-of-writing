import React, { useState } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import LoginTitle from '@/components/_login/LoginTitle'
import { Button } from '@/components/button'
import { GrayInput } from '@/components/input'
import { login } from '@/server/user'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = { big: boolean }

const LoginForm: React.FC<Props> = ({ big }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onClickLoginButton = async () => {
    const result = await login({ email, password })
    alert(result.message)
    router.push('/')
  }

  return (
    <Frame>
      {big ? <span className={'text-t24 -mt-4 font-semibold'}>로그인</span> : <LoginTitle />}
      <GrayInput placeholder={'이메일'} value={email} onChange={(e) => setEmail(e.target.value)} />
      <GrayInput
        type={'password'}
        placeholder={'비밀번호'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={`w-full ${CENTER_FLEX}`}>
        <Button className={'text-white'} onClick={onClickLoginButton}>
          로그인
        </Button>
      </div>
    </Frame>
  )
}

const Frame = styled.div`
  width: 400px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 0.7rem;
`

export default LoginForm
