import React, { useState } from 'react'

import classNames from 'classnames/bind'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { Label } from '@/components/form/register/RegisterMainForm'
import { GrayInput } from '@/components/input'
import { emailAtom, passwordAtom } from '@/hook/usePassword'
import styles from '@/pages/register/register.module.scss'
import { signUp } from '@/server/user'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const cx = classNames.bind(styles)

const RegisterNicknameForm: React.FC<Props> = ({}) => {
  const router = useRouter()
  const email = useAtomValue(emailAtom)
  const password = useAtomValue(passwordAtom)
  const [nickname, setNickname] = useState('')

  const onClickRegister = () => {
    void signUp({ email, password, nickname })
      .then((res) => {
        if (res.success) {
          alert(res.message)
          void router.push('/login')
        }
      })
      .catch((_) => {})
  }

  return (
    <div className={cx('h-screen', CENTER_FLEX, 'flex-col')}>
      <Label>사용할 닉네임</Label>
      <GrayInput
        className="w-386 h-52 mt-2"
        placeholder={'닉네임'}
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value)
        }}
      />
      <Button className={cx('text-white', 'h-52', 'w-386 mt-6')} onClick={onClickRegister}>
        회원가입
      </Button>
    </div>
  )
}

export default RegisterNicknameForm
