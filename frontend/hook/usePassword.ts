import React, { useCallback, useState } from 'react'

export const usePassword = () => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setPassword(e.target.value)
    },
    [setPassword],
  )

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
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
