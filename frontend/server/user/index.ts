import { SESSION_STORAGE_KEY_ACCESS_TOKEN, SESSION_STORAGE_KEY_REFRESH_TOKEN } from '@/constant'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const emailCheck = async (email: string): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.get(`/auth/email/${email}`)
    if (result.status === 200) {
      return { success: true, message: '사용 가능한 이메일입니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '중복된 이메일입니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

type SignUpData = {
  email: string
  password: string
  nickname: string
}

export const signUp = async (data: SignUpData): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.post(`/auth/sign`, data)
    if (result.status === 200) {
      return { success: true, message: '회원 가입에 성공했습니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '회원 가입에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export const login = async (data: { email: string; password: string }): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.post('/auth/login', data)
    if (result.status === 200) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY_ACCESS_TOKEN, result?.data?.data?.['access-token'])
      window.sessionStorage.setItem(SESSION_STORAGE_KEY_REFRESH_TOKEN, result?.data?.data?.['refresh-token-uuid'])
      return { success: true, message: '로그인에 성공했습니다!' }
    }
  } catch (e) {
    return { success: false, message: '로그인에 실패했습니다!' }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}
