import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { ReplyInfo } from '@/type/reply'

export const getPostReplies = async (postId: number): Promise<RESPONSE_TYPE<ReplyInfo[]>> => {
  try {
    const res = await baxios.get(`/reply/${postId}`)
    if (res.status === 200) return { success: true, message: '게시글 별 댓글 조회 성공!', data: res.data.data }
    return { success: false, message: '게시글 별 댓글 조회 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 별 댓글 조회 실패!' }
  }
}
