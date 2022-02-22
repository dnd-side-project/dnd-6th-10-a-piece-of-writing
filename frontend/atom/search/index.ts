import { atom } from 'jotai'

export enum SearchType {
  CONTENT = 'CONTENT',
  TAG = 'TAG',
  NICKNAME = 'NICKNAME',
}

export enum SearchTypeText {
  CONTENT = '글 내용',
  TAG = '토픽',
  NICKNAME = '글쓴이',
}

export const searchTextAtom = atom<string>('')
export const searchTypeAtom = atom<SearchType>(SearchType.CONTENT)
export const searchTypeTextAtom = atom<SearchTypeText>((get) => {
  const type = get(searchTypeAtom)
  if (type === SearchType.TAG) return SearchTypeText.TAG
  if (type === SearchType.NICKNAME) return SearchTypeText.NICKNAME
  return SearchTypeText.CONTENT
})
export const searchBarModalOpenAtom = atom<boolean>(false)

export const searchResultAtom = atom<any[] | null>(null)
export const didSearchAtom = atom<boolean>((get) => get(searchResultAtom) !== null)
