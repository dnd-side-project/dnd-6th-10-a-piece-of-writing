import React from 'react'

import classNames from 'classnames/bind'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import RegisterMainForm from '@/components/form/register/RegisterMainForm'
import RegisterNicknameForm from '@/components/form/register/RegisterNicknameForm'
import { CENTER_FLEX } from '@/styles/classNames'

import styles from './register.module.scss'

type Props = {}

const cx = classNames.bind(styles)

export const registerPageAtom = atom(1)

const Register: React.FC<Props> = ({}) => {
  const page = useAtomValue(registerPageAtom)
  return (
    <div className={cx('w-full', 'flex-col', CENTER_FLEX)}>
      {page === 1 && <RegisterMainForm />}
      {page === 2 && <RegisterNicknameForm />}
    </div>
  )
}

export default Register
