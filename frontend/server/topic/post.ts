import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { TopicInfo } from '@/server/topic/index'

export const loadPostTopics = async (postId: number): Promise<RESPONSE_TYPE<TopicInfo[]>> => {
  try {
    const res = await baxios.get(`/topic/posts/${postId}`)
    if (res.status === 200) return { success: true, message: '게시글별 토픽 로드 성공!', data: res.data?.data || [] }
    return { success: false, message: '게시글별 토픽 로드 실패!' }
  } catch (e) {
    return { success: false, message: '게시글별 토픽 로드 실패!' }
  }
}
