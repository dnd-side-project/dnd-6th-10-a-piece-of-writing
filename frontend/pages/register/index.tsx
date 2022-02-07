import React from 'react'
import { CENTER_FLEX } from '@/styles/classNames'

import classNames from 'classnames/bind'
import styles from './register.module.scss'
import RegisterMainForm from '@/components/form/register/RegisterMainForm'
import { useAtom } from 'jotai'
import { resgisterPageAtom } from '@/atom/register'
import RegisterNicknameForm from '@/components/form/register/RegisterNicknameForm'

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
