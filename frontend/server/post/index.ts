import { GetServerSidePropsContext } from 'next'

import { SearchType } from '@/atom/search'
import { KEY_ACCESS_TOKEN, KEY_HEADER_ACCESS_TOKEN, KEY_HEADER_REFRESH_TOKEN, KEY_REFRESH_TOKEN } from '@/constant'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { PostInfo } from '@/type/post'

export type PostData = {
  authorId: number
  content: string
  ref?: string
  topicIdList?: number[]
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

export const loadPost = async (postId: number): Promise<RESPONSE_TYPE<PostInfo>> => {
  try {
    const res = await baxios.get(`/posts/${postId}`)
    if (res.status === 200) return { success: true, message: '게시글 로드 성공!', data: res.data.data }
    return { success: false, message: '게시글 로드 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 로드 실패!' }
  }
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

export const loadMyPosts = async (ctx?: GetServerSidePropsContext): Promise<RESPONSE_TYPE<PostInfo[]>> => {
  try {
    const accessToken = ctx?.req?.cookies?.[KEY_ACCESS_TOKEN] ?? null
    const refreshToken = ctx?.req?.cookies?.[KEY_REFRESH_TOKEN] ?? null
    const res =
      accessToken && refreshToken
        ? await baxios.get(`/member/posts/list`, {
            headers: { [KEY_HEADER_ACCESS_TOKEN]: accessToken, [KEY_HEADER_REFRESH_TOKEN]: refreshToken },
          })
        : await baxios.get(`/member/posts/list`)
    if (res.status === 200) return { success: true, message: '내 게시글 로드 성공!', data: res.data.data }
    return { success: false, message: '내 게시글 로드 실패!' }
  } catch (e) {
    return { success: false, message: '내 게시글 로드 실패!' }
  }
}

export const loadMyLikedPosts = async (ctx?: GetServerSidePropsContext): Promise<RESPONSE_TYPE<PostInfo[]>> => {
  try {
    const accessToken = ctx?.req?.cookies?.[KEY_ACCESS_TOKEN] ?? null
    const refreshToken = ctx?.req?.cookies?.[KEY_REFRESH_TOKEN] ?? null
    const res =
      accessToken && refreshToken
        ? await baxios.get(`/member/like/list`, {
            headers: { [KEY_HEADER_ACCESS_TOKEN]: accessToken, [KEY_HEADER_REFRESH_TOKEN]: refreshToken },
          })
        : await baxios.get(`/member/like/list`)
    if (res.status === 200) return { success: true, message: '내 좋아요 게시글 로드 성공!', data: res.data.data }
    return { success: false, message: '내 좋아요 게시글 로드 실패!' }
  } catch (e) {
    return { success: false, message: '내 좋아요 게시글 로드 실패!' }
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

export const deletePost = async (id: number): Promise<RESPONSE_TYPE> => {
  try {
    const res = await baxios.delete(`/posts/${id}`)
    if (res.status === 200) return { success: true, message: '게시글 삭제 성공!' }
    return { success: false, message: '게시글 삭제 실패!' }
  } catch (e) {
    return { success: false, message: '게시글 삭제 실패!' }
  }
}
