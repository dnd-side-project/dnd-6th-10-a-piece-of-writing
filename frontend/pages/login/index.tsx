import React from 'react'

import styles from './login.module.scss'

import classNames from 'classnames/bind'
import { CENTER_FLEX } from '@/styles/classNames'
import { Input } from '@/components/input'
import { Button } from '@/components/button'

type Props = {}

const cx = classNames.bind(styles)

const login: React.FC<Props> = ({}) => {
  return (
    <div className={cx('w-full', 'h-screen', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <div className={cx('Frame-3485')}>
          <Input placeholder={'이메일'} />
          <Input placeholder={'비밀번호'} />
          <div className={`w-full ${CENTER_FLEX}`}>
            <Button className={cx('text-white')}>로그인</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login