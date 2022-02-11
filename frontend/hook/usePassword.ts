import React, { useCallback } from 'react'
import { RegisterMessage } from '@/components/form/register/RegisterMainForm'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(email.match(mail_format) && email.match(mail_format)?.length !== 0)
}

const passwordAtom = atom('')
const passwordCheckAtom = atom('')
const allConditionSatisfiedAtom = atom(
  (get) =>
    isValidEmail(get(emailAtom)) && get(passwordAtom) === get(passwordCheckAtom) && get(passwordAtom).length >= 9,
)
export const emailAtom = atom('')
export const registerMessageAtom = atom<RegisterMessage>((get) => ({
  email: isValidEmail(get(emailAtom)) || get(emailAtom) === '' ? '' : '올바른 이메일 형식이 아닙니다.',
  password: get(passwordAtom).length >= 9 || get(passwordAtom) === '' ? '' : '영문자, 숫자 포함 8~20자',
  passwordCheck:
    get(passwordAtom) === get(passwordCheckAtom) || get(passwordCheckAtom) === ''
      ? ''
      : '비밀번호 확인이 일치하지 않습니다.',
}))

export const useRegister = () => {
  const [password, setPassword] = useAtom(passwordAtom)
  const [passwordCheck, setPasswordCheck] = useAtom(passwordCheckAtom)
  const allConditionSatisfied = useAtomValue(allConditionSatisfiedAtom)

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

  const check = useCallback(() => {
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
    check,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    onChangePassword,
    onChangePasswordCheck,
    allConditionSatisfied,
  }
}
