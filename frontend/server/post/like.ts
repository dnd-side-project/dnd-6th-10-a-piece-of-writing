import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const like = async (postId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.get(`/posts/like/${postId}`)
    if (res.status === 200) return { success: true, message: '좋아요 성공!', data: res.data.data }
    return { success: false, message: '좋아요 실패!' }
  } catch (e) {
    return { success: false, message: '좋아요 실패!' }
  }
}

export const unlike = async (postId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.delete(`/posts/like/${postId}`)
    if (res.status === 200) return { success: true, message: '좋아요 취소 성공!', data: res.data.data }
    return { success: false, message: '좋아요 취소 실패!' }
  } catch (e) {
    return { success: false, message: '좋아요 취소 실패!' }
  }
}
