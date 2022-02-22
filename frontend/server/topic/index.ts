import { RESPONSE_TYPE } from '@/server/axios/baxios'

export type TopicInfo = {
  id: string
  name: string
}

export const addTopic = async (topicName: string): Promise<RESPONSE_TYPE<TopicInfo>> => {
  console.log(`addTopic_${topicName}`)
  await setTimeout(() => {}, 500)
  const dummyId = Math.ceil(Math.random() * 9999).toString()
  return {
    success: true,
    message: '태그 추가 성공',
    data: {
      id: Math.ceil(Math.random() * 9999).toString(),
      name: `임의의태그_${dummyId}`,
    },
  }
}

const DUMMY_DATA = [
  { id: '1', name: '운동' },
  { id: '2', name: '감성' },
  { id: '3', name: '인생1' },
  { id: '4', name: '인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2인생2' },
  { id: '5', name: '인생3' },
  { id: '6', name: '인생4' },
  { id: '7', name: '인생5' },
]

export const searchTopic = async (topicName: string): Promise<RESPONSE_TYPE<TopicInfo[]>> => {
  console.log(`searchTopic_${topicName}`)
  await setTimeout(() => {}, 500)
  const randIndex = Math.ceil(Math.random() * 6)
  return {
    success: true,
    message: '태그 검색 성공',
    data: DUMMY_DATA.slice(0, randIndex),
  }
}
