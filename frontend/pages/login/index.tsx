import React, { useState } from 'react'

import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

import { UserInfo as UserInfoType } from '@/components/_user/type'
import { Button } from '@/components/button'
import { GrayInput } from '@/components/input'
import useAlreadyLogin from '@/hook/useAlreadyLogin'
import { useSsrMe } from '@/hook/useSsrMe'
import { login } from '@/server/user'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'

import styles from './login.module.scss'

type ServerSideProps = { me: UserInfoType }

const cx = classNames.bind(styles)

const Login: React.FC<ServerSideProps> = ({ me }) => {
  useSsrMe(me)
  useAlreadyLogin()
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
        <span className={'text-t24 -mt-4 font-semibold'}>로그인</span>
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

export const getServerSideProps = withAuthServerSideProps()

export default Login
