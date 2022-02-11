import React from 'react'

import classNames from 'classnames/bind'
import { useAtom } from 'jotai'

import { resgisterPageAtom } from '@/atom/register'
import RegisterMainForm from '@/components/form/register/RegisterMainForm'
import RegisterNicknameForm from '@/components/form/register/RegisterNicknameForm'
import { CENTER_FLEX } from '@/styles/classNames'

import styles from './register.module.scss'

type Props = {}

const cx = classNames.bind(styles)

const register: React.FC<Props> = ({}) => {
  const [page, setPage] = useAtom(resgisterPageAtom)
  return (
    <div className={cx('w-full', 'flex-col', CENTER_FLEX)}>
      {page === 1 && <RegisterMainForm />}
      {page === 2 && <RegisterNicknameForm />}
      <button
        onClick={() => {
          setPage(2)
        }}>
        test
      </button>
    </div>
  )
}

export default register
