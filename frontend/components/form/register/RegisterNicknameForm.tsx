import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from '@/pages/register/register.module.scss'
import { GrayInput } from '@/components/input'
import { Label } from '@/components/form/register/RegisterMainForm'
import { Button } from '@/components/button'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const cx = classNames.bind(styles)

const RegisterNicknameForm: React.FC<Props> = ({}) => {
  const [nickNmae, setNickName] = useState('')

  const onClickStart = () => {}

  return (
    <div className={cx('h-screen', CENTER_FLEX, 'flex-col')}>
      <Label>사용할 닉네임</Label>
      <GrayInput
        className="w-386 h-52 mt-2"
        placeholder={'닉네임'}
        value={nickNmae}
        onChange={(e) => {
          setNickName(e.target.value)
        }}
      />
      <Button className={cx('text-white', 'h-52', 'w-386 mt-6')} onClick={onClickStart}>
        회원가입
      </Button>
    </div>
  )
}

export default RegisterNicknameForm
