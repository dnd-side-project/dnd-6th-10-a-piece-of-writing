import React, { useCallback, useEffect, useState } from 'react'
import { GrayInput } from '@/components/input'
import { Button } from '@/components/button'
import styled from 'styled-components'
import { usePassword } from '@/hook/usePassword'
import { useDebounce } from 'react-use'
import classNames from 'classnames/bind'
import styles from '@/pages/register/register.module.scss'

type Props = {}

export type RegisterMessage = {
  email: string
  password: string
  passwordCheck: string
}

const cx = classNames.bind(styles)

const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(email.match(mail_format) && email.match(mail_format)?.length !== 0)
}

const RegisterMainForm: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<RegisterMessage>({ email: '', password: '', passwordCheck: '' })
  const { password, checkPassword, passwordCheck, onChangePassword, onChangePasswordCheck } = usePassword({
    setMessage,
  })
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
      setMessage({ ...message, email: isValidEmail(e.target.value) ? '' : '올바른 이메일 형식이 아닙니다.' })
    },
    [email, setEmail],
  )

  const onClickRegister = () => {
    if (!checkPassword()) return

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
