import { GetServerSidePropsContext } from 'next'

import { KEY_ACCESS_TOKEN, KEY_HEADER_ACCESS_TOKEN, KEY_HEADER_REFRESH_TOKEN, KEY_REFRESH_TOKEN } from '@/constant'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export type TopicInfo = {
  topicId: number
  name: string
  isChecked?: boolean
}

export const addTopic = async (name: string): Promise<RESPONSE_TYPE<TopicInfo>> => {
  try {
    const res = await baxios.post(`/topic`, { name })
    if (res.status === 200) return { success: true, message: '토픽 추가 성공!', data: res.data?.data }
    return { success: false, message: '토픽 추가 실패!' }
  } catch (e) {
    return { success: false, message: '토픽 추가 실패!' }
  }
}

export const searchTopic = async (topicName: string): Promise<RESPONSE_TYPE<TopicInfo[]>> => {
  try {
    const res = await baxios.get(`/topic/search/${topicName}`)
    if (res.status === 200) return { success: true, message: '토픽 검색 성공!', data: res.data?.data || [] }
    return { success: false, message: '토픽 검색 실패!' }
  } catch (e) {
    return { success: false, message: '토픽 검색 실패!' }
  }
}

export const loadMainTopics = async (ctx?: GetServerSidePropsContext): Promise<RESPONSE_TYPE<TopicInfo[]>> => {
  try {
    const accessToken = ctx?.req?.cookies?.[KEY_ACCESS_TOKEN] ?? null
    const refreshToken = ctx?.req?.cookies?.[KEY_REFRESH_TOKEN] ?? null
    const res =
      accessToken && refreshToken
        ? await baxios.get(`/topic/list`, {
            headers: { [KEY_HEADER_ACCESS_TOKEN]: accessToken, [KEY_HEADER_REFRESH_TOKEN]: refreshToken },
          })
        : await baxios.get(`/topic/list`)
    if (res.status === 200) return { success: true, message: '토픽 로드 성공!', data: res.data?.data || [] }
    return { success: false, message: '토픽 로드 실패!' }
  } catch (e) {
    return { success: false, message: '토픽 로드 실패!' }
  }
}
