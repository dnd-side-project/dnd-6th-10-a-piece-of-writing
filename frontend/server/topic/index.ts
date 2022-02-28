import { GetServerSidePropsContext } from 'next'

import { KEY_ACCESS_TOKEN, KEY_HEADER_ACCESS_TOKEN, KEY_HEADER_REFRESH_TOKEN, KEY_REFRESH_TOKEN } from '@/constant'
import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'

export type TopicInfo = {
  topicId: number
  name: string
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

const DUMMY_DATA: TopicInfo[] = [
  { topicId: 1, name: '운동' },
  { topicId: 2, name: '감성' },
  { topicId: 3, name: '인생1' },
  { topicId: 4, name: '인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2' },
  { topicId: 5, name: '인생3' },
  { topicId: 6, name: '인생4' },
  { topicId: 7, name: '인생5' },
]

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
