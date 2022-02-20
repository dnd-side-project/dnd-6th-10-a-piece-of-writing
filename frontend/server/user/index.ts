import { Cookies } from 'react-cookie'

import { KEY_ACCESS_TOKEN, KEY_HEADER_ACCESS_TOKEN, KEY_HEADER_REFRESH_TOKEN, KEY_REFRESH_TOKEN } from '@/constant'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const cookies = new Cookies()

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
      window.sessionStorage.setItem(KEY_ACCESS_TOKEN, result?.data?.data?.['access-token'])
      window.sessionStorage.setItem(KEY_REFRESH_TOKEN, result?.data?.data?.['refresh-token-uuid'])
      cookies.set(KEY_ACCESS_TOKEN, result?.data?.data?.['access-token'])
      cookies.set(KEY_REFRESH_TOKEN, result?.data?.data?.['refresh-token-uuid'])

      return { success: true, message: '로그인에 성공했습니다!' }
    }
  } catch (e) {
    return { success: false, message: '로그인에 실패했습니다!' }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export const loadMe = async (accessToken: string, refreshToken: string): Promise<RESPONSE_TYPE> => {
  if (!accessToken && !refreshToken) {
    return { success: false, message: '토큰 값 없음' }
  }
  try {
    const result = await baxios.get('/member/user', {
      headers: { [KEY_HEADER_ACCESS_TOKEN]: accessToken, [KEY_HEADER_REFRESH_TOKEN]: refreshToken },
    })

    if (result.status === 200 && result.data?.principal?.member) {
      return {
        success: true,
        data: result.data?.principal?.member,
        message: '내 정보 로드 성공',
      }
    }
    return {
      success: false,
      message: '내 정보 파싱 실패',
    }
  } catch (e) {
    return { success: false, message: '내 정보 로드에 실패했습니다.' }
  }
}
