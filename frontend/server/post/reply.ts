import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export const loadReplyFirst = async (postId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.get(`/reply/first/${postId}`)
    if (res.status === 200) return { success: true, message: '댓글 초기 로드 성공!', data: res.data?.data }
    return { success: false, message: '댓글 초기 로드 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 초기 로드 실패!' }
  }
}

export const loadReplyAll = async (postId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.get(`/reply/${postId}`)
    if (res.status === 200) return { success: true, message: '댓글 로드 성공!', data: res.data?.data }
    return { success: false, message: '댓글 로드 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 로드 실패!' }
  }
}

export const deleteReply = async (replyId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.delete(`/reply/${replyId}`)
    if (res.status === 200) return { success: true, message: '댓글 삭제 성공!', data: res.data?.data }
    return { success: false, message: '댓글 삭제 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 삭제 실패!' }
  }
}

export const modifyReply = async (replyId: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.put(`/reply/${replyId}`)
    if (res.status === 200) return { success: true, message: '댓글 삭제 성공!', data: res.data?.data }
    return { success: false, message: '댓글 삭제 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 삭제 실패!' }
  }
}
