import React, { useCallback, useState } from 'react'

import { RegisterMessage } from '@/components/form/register/RegisterMainForm'

export const usePassword = ({ setMessage }: { setMessage: React.Dispatch<React.SetStateAction<RegisterMessage>> }) => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      e.target.value.length <= 9
        ? setMessage((message) => ({ ...message, password: '영문자, 숫자 포함 8~20자' }))
        : setMessage((message) => ({ ...message, password: '' }))
      e.target.value !== passwordCheck
        ? setMessage((message) => ({ ...message, passwordCheck: '비밀번호가 일치하지 않습니다.' }))
        : setMessage((message) => ({ ...message, passwordCheck: '' }))
      setPassword(e.target.value)
    },
    [setPassword],
  )

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      e.target.value !== password
        ? setMessage((message) => ({ ...message, passwordCheck: '비밀번호가 일치하지 않습니다.' }))
        : setMessage((message) => ({ ...message, passwordCheck: '' }))
      setPasswordCheck(e.target.value)
    },
    [setPassword],
  )

  const checkPassword = useCallback(() => {
    if (!password) {
      alert('비밀번호를 입력하세요.')
      return false
    }
    if (!passwordCheck) {
      alert('비밀번호 확인을 입력하세요.')
      return false
    }
    if (password !== passwordCheck) {
      alert('비밀번호 확인이 일치하지 않습니다!')
      return false
    }
    return true
  }, [password, passwordCheck])

  return {
    password,
    setPassword,
    checkPassword,
    passwordCheck,
    setPasswordCheck,
    onChangePassword,
    onChangePasswordCheck,
  }
}
