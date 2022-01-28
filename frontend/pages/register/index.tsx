import React from 'react'
import { Input } from '@/components/input'
import { CENTER_FLEX } from '@/styles/classNames'
import classNames from 'classnames/bind'
import styles from './register.module.scss'
import { Button } from '@/components/button'

type Props = {}

const cx = classNames.bind(styles)

const register: React.FC<Props> = ({}) => {
  return (
    <div className={cx('w-full', 'h-screen', 'flex-col', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <Input placeholder={'이메일'} />
        <Input placeholder={'비밀번호'} />
        <Input placeholder={'비밀번호 확인'} />
        <div className={`w-full ${CENTER_FLEX}`}>
          <Button className={'text-white'}>로그인</Button>
        </div>
      </div>
    </div>
  )
}

export default register
