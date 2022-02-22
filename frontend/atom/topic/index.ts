import { atom } from 'jotai'

import { TopicInfo } from '@/server/topic'

export const topicSearchTextAtom = atom('')
export const topicsAtom = atom<TopicInfo[]>([
  { id: '11', name: '사랑' },
  { id: '12', name: '태그1' },
  { id: '13', name: '태그2' },
  { id: '14', name: '게임' },
  { id: '15', name: '스포츠' },
  { id: '16', name: '명언' },
  { id: '17', name: '사랑' },
])

export const addTopicUpdateAtom = atom(null, (get, set, topic: TopicInfo) => {
  set(
    topicsAtom,
    [...get(topicsAtom), topic].filter((topicInfo, index, self) => self.indexOf(topicInfo) === index),
  )
})

export const userTopicsAtom = atom<TopicInfo[]>([])

export const topicSearchResultsAtom = atom<TopicInfo[]>([
  { id: '12', name: '태그1' },
  { id: '13', name: '태그2' },
  { id: '14', name: '게임' },
  { id: '15', name: '스포츠' },
  { id: '16', name: '명언' },
  { id: '17', name: '사랑' },
])
