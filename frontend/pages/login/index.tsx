import React from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/components/button'
import { GrayInput } from '@/components/input'
import { CENTER_FLEX } from '@/styles/classNames'

import styles from './login.module.scss'

type Props = {}

const cx = classNames.bind(styles)

const login: React.FC<Props> = ({}) => {
  return (
    <div className={cx('w-full', 'h-screen', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <GrayInput placeholder={'이메일'} />
        <GrayInput placeholder={'비밀번호'} />
        <div className={`w-full ${CENTER_FLEX}`}>
          <Button className={cx('text-white')}>로그인</Button>
        </div>
      </div>
    </div>
  )
}

export default login
