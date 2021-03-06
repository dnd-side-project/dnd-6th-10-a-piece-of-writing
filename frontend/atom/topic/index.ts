import { atom } from 'jotai'

import { TopicInfo } from '@/server/topic'

export const DUMMY_TOPICS = [
  { topicId: 11, name: '사랑' },
  { topicId: 12, name: '태그1' },
  { topicId: 13, name: '태그2' },
  { topicId: 14, name: '게임' },
  { topicId: 15, name: '스포츠' },
  { topicId: 16, name: '명언' },
  { topicId: 17, name: '사랑' },
]

export const topicSearchTextAtom = atom('')
export const topicSearchTextForApiAtom = atom('')
export const topicsAtom = atom<TopicInfo[]>([])
export const checkedTopicsAtom = atom<TopicInfo[]>((get) => get(topicsAtom).filter((topic) => topic.isChecked))

export const checkTopicUpdateAtom = atom(null, (get, set, index: number) => {
  const newTopics = [...get(topicsAtom)] || []
  if (newTopics[index]) newTopics[index]['isChecked'] = !newTopics[index]?.['isChecked']
  set(topicsAtom, newTopics)
})

export const addTopicUpdateAtom = atom(null, (get, set, topic: TopicInfo) => {
  set(
    topicsAtom,
    [...get(topicsAtom), topic].filter((topicInfo, index, self) => self.indexOf(topicInfo) === index),
  )
})

export const userTopicsAtom = atom<TopicInfo[]>([])

export const topicSearchResultsAtom = atom<TopicInfo[]>([])

export const isTopicSearchBarOpenAtom = atom<boolean>(false)
export const isTopicSearchModalOpenAtom = atom<boolean>(false)
