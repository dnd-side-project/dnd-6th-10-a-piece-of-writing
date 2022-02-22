import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const follow = async (userId: number): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.post(`/relation/follow/${userId}`)
    if (result.status === 200) {
      return { success: true, message: '팔로우 요청에 성공했습니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '팔로우 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export const unfollow = async (userId: number): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.delete(`/relation/follow/${userId}`)
    if (result.status === 200) {
      return { success: true, message: '언팔로우 요청에 성공했습니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '언팔로우 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}
