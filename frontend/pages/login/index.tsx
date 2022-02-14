import React, { useState } from 'react'

import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { GrayInput } from '@/components/input'
import { login } from '@/server/user'
import { CENTER_FLEX } from '@/styles/classNames'

import styles from './login.module.scss'

type Props = {}

const cx = classNames.bind(styles)

const Login: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onClickLoginButton = async () => {
    const result = await login({ email, password })
    alert(result.message)
    router.push('/')
  }
  return (
    <div className={cx('w-full', 'h-screen', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <GrayInput placeholder={'이메일'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <GrayInput
          type={'password'}
          placeholder={'비밀번호'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={`w-full ${CENTER_FLEX}`}>
          <Button className={cx('text-white')} onClick={onClickLoginButton}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
