import React from 'react'

import styles from './login.module.scss'

import classNames from 'classnames/bind'
import { CENTER_FLEX } from '@/styles/classNames'
import { GrayInput } from '@/components/input'
import { BlackButton } from '@/components/button'

type Props = {}

const cx = classNames.bind(styles)

const login: React.FC<Props> = ({}) => {
  return (
    <div className={cx('w-full', 'h-screen', CENTER_FLEX)}>
      <div className={cx('Frame')}>
        <div className={cx('Frame-3485')}>
          <GrayInput placeholder={'이메일'} />
          <GrayInput placeholder={'비밀번호'} />
          <div className={`w-full ${CENTER_FLEX}`}>
            <BlackButton className={cx('text-white')}>로그인</BlackButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
