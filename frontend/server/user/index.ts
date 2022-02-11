import baxios from '@/server/axios/baxios'

type RESPONSE_TYPE = {
  success: boolean
  message: string
}

export const emailCheck = async (email: string): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.get(`/auth/email/${email}`)
    if (result.status === 200) {
      return { success: true, message: '사용 가능한 이메일입니다!' }
    }
  } catch (e) {
    if (e.response.status === 404) {
      return {
        success: false,
        message: '중복된 이메일입니다!',
      }
    }
  }
  return {
    success: false,
    message: '오류가 발생했습니다!',
  }
}
