import { atom } from 'jotai'

import { TagInfo } from '@/server/tag'

export const tagSearchTextAtom = atom('')
export const tagsAtom = atom<TagInfo[]>([
  { id: '11', name: '사랑' },
  { id: '12', name: '태그1' },
  { id: '13', name: '태그2' },
  { id: '14', name: '게임' },
  { id: '15', name: '스포츠' },
  { id: '16', name: '명언' },
  { id: '17', name: '사랑' },
])

export const addTagUpdateAtom = atom(null, (get, set, tag: TagInfo) => {
  set(
    tagsAtom,
    [...get(tagsAtom), tag].filter((tagInfo, index, self) => self.indexOf(tagInfo) === index),
  )
})

export const tagSearchResultsAtom = atom<TagInfo[]>([])
