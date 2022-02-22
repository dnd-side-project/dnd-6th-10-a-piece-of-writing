import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

type PostData = {
  author: string
  content: string
  ref?: string
}

export const uploadPosts = async (postData: PostData): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.post(`/posts`, postData)
    if (res.status === 200) return { success: true, message: '게시글 추가 성공!', data: res.data.data }
    return { success: false, message: '게시글 추가 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 추가 실패!' }
  }
}

export const deletePost = async (id: string): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.delete(`/posts/${id}`)
    if (res.status === 200) return { success: true, message: '게시글 삭제 성공!' }
    return { success: false, message: '게시글 삭제 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 삭제 실패!' }
  }
}