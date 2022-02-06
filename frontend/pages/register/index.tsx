import React, { useCallback, useEffect, useState } from 'react'
import { BlackButton } from '@/components/button'
import { CENTER_FLEX } from '@/styles/classNames'

import classNames from 'classnames/bind'
import styles from './register.module.scss'
import { useDebounce } from 'usehooks-ts'
import { GrayInput } from '@/components/input'
import styled from 'styled-components'

type Props = {}

const cx = classNames.bind(styles)

const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(email.match(mail_format) && email.match(mail_format)?.length !== 0)
}

const register: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const debouncedValue = useDebounce<string>(message, 500)

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
      setMessage(isValidEmail(e.target.value) ? '' : '올바른 이메일이 아닙니다!')
    },
    [email, setEmail],
  )

  useEffect(() => {
    // 이메일 중복확인 테스트
  }, [debouncedValue])

  return (
    <div className={cx('w-full', 'h-screen', 'flex-col', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <Label>이메일</Label>
        <GrayInput className="w-386 h-52" placeholder={'이메일'} value={email} onChange={onChangeEmail} />
        <Label>비밀번호</Label>
        <GrayInput className="w-386 h-52" placeholder={'비밀번호'} />
        <Label>비밀번호 확인</Label>
        <GrayInput className="w-386 h-52" placeholder={'비밀번호 확인'} type={'password'} />
        <BlackButton className={cx('text-white', 'h-52', 'w-386 mt-2')}>회원가입</BlackButton>
        <div className={cx('w-full', 'text-red-400', CENTER_FLEX)}>{debouncedValue}</div>
      </div>
    </div>
  )
}

const Label = styled.label`
  height: 18px;
  flex-grow: 0;
  font-family: NotoSansKR;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #737373;
`

export default register
