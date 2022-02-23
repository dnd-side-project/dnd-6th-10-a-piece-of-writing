import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const loadProfile = async (userId: number): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.get(`/member/profile/${userId}`)

    if (result.status === 200 && result.data?.data) {
      return {
        success: true,
        data: result.data?.data,
        message: '프로필 조 성공',
      }
    }
    return {
      success: false,
      message: '프로필 조 데이터 파싱 실패',
    }
  } catch (e) {
    return { success: false, message: '프로필 조회에 실패했습니다.' }
  }
}

export const setProfileImage = async (formData: FormData): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.post('/member/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (result.status === 200 && result.data?.data) {
      return {
        success: true,
        data: result.data?.data,
        message: '프로필 설정 성공',
      }
    }
    return {
      success: false,
      message: '프로필 설정 데이터 파싱 실패',
    }
  } catch (e) {
    return { success: false, message: '프로필 설정에 실패했습니다.' }
  }
}
