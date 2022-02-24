import React, { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { BallTriangle } from 'react-loader-spinner'
import { useDebounce } from 'react-use'

import { Button } from '@/components/button'
import { Label } from '@/components/form/register/RegisterMainForm'
import { GrayInput } from '@/components/input'
import { emailAtom, passwordAtom } from '@/hook/usePassword'
import styles from '@/pages/register/register.module.scss'
import { nicknameCheck, signUp } from '@/server/user'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const cx = classNames.bind(styles)

const RegisterNicknameForm: React.FC<Props> = ({}) => {
  const router = useRouter()
  const email = useAtomValue(emailAtom)
  const password = useAtomValue(passwordAtom)
  const [message, setMessage] = useState('')
  const [nickname, setNickname] = useState('')
  const [nicknameDebounced, setNicknameDebounced] = useState('')
  const [isChanging, setIsChanging] = useState(false)

  const onClickRegister = () => {
    if (nickname.length > 20 || nickname.length === 0) return alert('닉네임이 올바르지 않습니다.')
    if (isChanging) return alert('닉네임 여부를 체크중입니다. 잠시만 기다려주세요.')
    if (!email || !password) {
      alert('이메일 혹은 비밀번호가 올바르지 않습니다. 다시 돌아가서 회원가입 시도해주십시오.')
      router.push('/')
      return
    }
    void signUp({ email, password, nickname })
      .then((res) => {
        if (res.success) {
          alert(res.message)
          void router.push('/login')
        }
      })
      .catch((_) => {})
  }

  const [,] = useDebounce(
    () => {
      setNicknameDebounced(nickname)
      setIsChanging(false)
    },
    500,
    [nickname],
  )

  useEffect(() => {
    if (nickname.length > 20 || nickname.length === 0) return
    nicknameCheck(nickname)
      .then((res) => {
        if (res.success) {
          setMessage('')
          return
        }
        setMessage(res.message)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [nicknameDebounced])

  return (
    <div className={cx('h-screen', CENTER_FLEX, 'flex-col')}>
      <div className={'flex w-full'}>
        <Label>사용할 닉네임</Label>
      </div>
      <div className={'flex w-full relative'}>
        <GrayInput
          className="w-386 h-52 mt-2"
          placeholder={'닉네임'}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value)
            setIsChanging(true)
          }}
        />
        {isChanging && (
          <div className={'absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2'}>
            <BallTriangle height={42} color={'gray'} />
          </div>
        )}
      </div>
      <div className={cx('w-full', 'text-red-400', 'mb-1')}>{message}</div>
      <Button className={cx('text-white', 'h-52', 'w-386 mt-6')} onClick={onClickRegister}>
        시작하기
      </Button>
    </div>
  )
}

export default RegisterNicknameForm
