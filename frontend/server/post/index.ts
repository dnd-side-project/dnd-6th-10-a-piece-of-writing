import { SearchType } from '@/atom/search'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { PostInfo } from '@/type/post'

export type PostData = {
  authorId: number
  content: string
  ref?: string
  topicList?: number[]
}

export const loadMainPosts = async (params: { page: number; size: number }): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.get(`/posts/list`, { params })
    if (res.status === 200) return { success: true, message: '게시글 로드 성공!', data: res.data?.data }
    return { success: false, message: '게시글 로드 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 로드 실패!' }
  }
}

export type PostsParam = {
  page?: number
  size: number
  type: SearchType
  keyword: string
}

export const loadPosts = async (params: {
  page: number
  size: number
  type: SearchType
  keyword: string
}): Promise<RESPONSE_TYPE<PostInfo[]>> => {
  try {
    const res = await baxios.post(`/posts/search`, params)
    if (res.status === 200) return { success: true, message: '게시글 검색 성공!', data: res.data.data }
    return { success: false, message: '게시글 검색 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 검색 실패!' }
  }
}

export type UploadPostParam = {
  formData: FormData
}

export const uploadPost = async ({ formData }: UploadPostParam): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.post(`/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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
