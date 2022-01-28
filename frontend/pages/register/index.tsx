import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { CENTER_FLEX } from '@/styles/classNames'

import classNames from 'classnames/bind'
import styles from './register.module.scss'
import { useDebounce } from 'usehooks-ts'

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
        <Input placeholder={'이메일'} value={email} onChange={onChangeEmail} />
        <Input placeholder={'비밀번호'} />
        <Input placeholder={'비밀번호 확인'} type={'password'} />
        <div className={cx('w-full', 'text-red-400', CENTER_FLEX)}>{debouncedValue}</div>
        <div className={`w-full ${CENTER_FLEX}`}>
          <Button className={'text-white'}>회원가입</Button>
        </div>
      </div>
    </div>
  )
}

export default register
