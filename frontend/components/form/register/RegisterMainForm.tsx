import React, { useCallback, useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useDebounce } from 'react-use'
import styled from 'styled-components'

import { Button } from '@/components/button'
import { GrayInput } from '@/components/input'
import { emailAtom, isValidEmail, registerMessageAtom, useRegister } from '@/hook/usePassword'
import { registerPageAtom } from '@/pages/register'
import styles from '@/pages/register/register.module.scss'
import { emailCheck } from '@/server/user'

export type RegisterMessage = {
  email: string
  password: string
  passwordCheck: string
}

const cx = classNames.bind(styles)

type Props = {}

const RegisterMainForm: React.FC<Props> = ({}) => {
  const [email, setEmail] = useAtom(emailAtom)
  const setPage = useUpdateAtom(registerPageAtom)
  const message = useAtomValue(registerMessageAtom)
  const { password, checkPassword, passwordCheck, onChangePassword, onChangePasswordCheck, allConditionSatisfied } =
    useRegister()
  const [emailDebouncedValue, setEmailDebouncedValue] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const [,] = useDebounce(
    () => {
      setEmailDebouncedValue(email)
    },
    500,
    [email],
  )

  useEffect(() => {
    if (!isValidEmail(email)) return
    emailCheck(email)
      .then((res) => {
        if (res.success) {
          setEmailMessage('')
          return
        }
        setEmailMessage(res.message)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [emailDebouncedValue])

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    [email, setEmail],
  )

  const onClickRegister = () => {
    if (!checkPassword()) return
    if (!allConditionSatisfied) {
      alert('잘못된 이메일 혹은 비밀번호입니다!')
      return
    }
    setPage(2)
  }

  return (
    <div className={cx('Frame')}>
      <MainSpan>
        글 한 조각,
        <br /> 함께 음미해보세요
      </MainSpan>
      <Label>이메일</Label>
      {/*<div className="flex w-386 h-52">*/}
      <GrayInput className="w-3/4 h-52" placeholder={'이메일'} value={email} onChange={onChangeEmail} />
      {/*<button>중복 체크</button>*/}
      {/*</div>*/}
      <div className={cx('w-full', 'text-red-400', 'mb-1')}>{emailMessage || message.email}</div>
      <Label>비밀번호</Label>
      <GrayInput
        className="w-386 h-52"
        placeholder={'비밀번호'}
        value={password}
        onChange={onChangePassword}
        type={'password'}
      />
      <div className={cx('w-full', 'text-red-400', 'mb-1')}>{message.password}</div>
      <Label>비밀번호 확인</Label>
      <GrayInput
        className="w-386 h-52"
        placeholder={'비밀번호 확인'}
        type={'password'}
        value={passwordCheck}
        onChange={onChangePasswordCheck}
      />
      <div className={cx('w-full', 'text-red-400', 'mb-1')}>{message.passwordCheck}</div>
      <Button className={cx('text-white', 'h-52', 'w-386 mt-2')} onClick={onClickRegister}>
        회원가입
      </Button>
    </div>
  )
}

export const Label = styled.label`
  height: 18px;
  flex-grow: 0;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #737373;
`

export const MainSpan = styled.span`
  height: 144px;
  margin-top: 198px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #000;

  font-size: 28px;
  margin-bottom: 2px;
  @media screen and (min-width: 500px) {
    font-size: 48px;
    margin-bottom: 58px;
  }
`

export default RegisterMainForm
