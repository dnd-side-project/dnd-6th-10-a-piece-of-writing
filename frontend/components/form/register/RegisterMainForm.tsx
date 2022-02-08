import React, { useCallback, useEffect, useState } from 'react'
import { GrayInput } from '@/components/input'
import { Button } from '@/components/button'
import styled from 'styled-components'
import { emailAtom, registerMessageAtom, useRegister } from '@/hook/usePassword'
import { useDebounce } from 'react-use'
import classNames from 'classnames/bind'
import styles from '@/pages/register/register.module.scss'
import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

export type RegisterMessage = {
  email: string
  password: string
  passwordCheck: string
}

const cx = classNames.bind(styles)

type Props = {
  onClickRegister: () => void
}

const RegisterMainForm: React.FC<Props> = ({ onClickRegister }) => {
  const [email, setEmail] = useAtom(emailAtom)
  const message = useAtomValue(registerMessageAtom)
  const { password, check, passwordCheck, onChangePassword, onChangePasswordCheck, allConditionSatisfied } =
    useRegister()
  const [emailDebouncedValue, setEmailDebouncedValue] = useState('')

  const [,] = useDebounce(
    () => {
      setEmailDebouncedValue(message.email)
    },
    500,
    [message?.email],
  )

  useEffect(() => {
    // 이메일 중복확인 테스트
  }, [emailDebouncedValue])

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    [email, setEmail],
  )

  const _onClickRegister = () => {
    if (!check) return
    if (!allConditionSatisfied) {
      alert('잘못된 이메일 혹은 비밀번호입니다!')
      return
    }
    onClickRegister()
    // 회원가입 api
  }

  return (
    <div className={cx('Frame')}>
      <MainSpan>
        글 한 조각,
        <br /> 함께 음미해보세요
      </MainSpan>
      <Label>이메일</Label>
      <GrayInput className="w-386 h-52" placeholder={'이메일'} value={email} onChange={onChangeEmail} />
      <div className={cx('w-full', 'text-red-400', 'mb-1')}>{emailDebouncedValue}</div>
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
      <Button className={cx('text-white', 'h-52', 'w-386 mt-2')} onClick={_onClickRegister}>
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
  margin-bottom: 58px;
  font-size: 48px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`

export default RegisterMainForm
