import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { ReplyInfo } from '@/type/reply'

export type AddReplyParam = {
  text: string
  postsId: number
}

export const addReply = async (param: AddReplyParam): Promise<RESPONSE_TYPE<ReplyInfo>> => {
  try {
    const res = await baxios.post(`/reply`, param)
    if (res.status === 200) return { success: true, message: '댓글 추가 성공!', data: res.data.data }
    return { success: false, message: '댓글 추가 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 추가 실패!' }
  }
}

export const deleteReply = async (replyId: number): Promise<RESPONSE_TYPE<ReplyInfo>> => {
  try {
    const res = await baxios.delete(`/reply/${replyId}`)
    if (res.status === 200) return { success: true, message: '댓글 삭제 성공!' }
    return { success: false, message: '댓글 삭제 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 삭제 실패!' }
  }
}

export const modifyReply = async (param: AddReplyParam): Promise<RESPONSE_TYPE<ReplyInfo>> => {
  try {
    const res = await baxios.put(`/reply/${param.postsId}`, { text: param.text })
    if (res.status === 200) return { success: true, message: '댓글 수정 성공!', data: res.data.data }
    return { success: false, message: '댓글 수정 실패!' }
  } catch (e) {
    return { success: false, message: '댓글 수정 실패!' }
  }
}
