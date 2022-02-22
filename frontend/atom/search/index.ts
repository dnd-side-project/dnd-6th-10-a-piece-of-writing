import { atom } from 'jotai'

export enum SearchType {
  CONTENT = 'c',
  TOPIC = 't',
  NICKNAME = 'a',
}

export enum SearchTypeText {
  CONTENT = '글 내용',
  TOPIC = '토픽',
  NICKNAME = '글쓴이',
}

export const searchTextAtom = atom<string>('')
export const searchTypeAtom = atom<SearchType>(SearchType.CONTENT)
export const searchTypeTextAtom = atom<SearchTypeText>((get) => {
  const type = get(searchTypeAtom)
  if (type === SearchType.TOPIC) return SearchTypeText.TOPIC
  if (type === SearchType.NICKNAME) return SearchTypeText.NICKNAME
  return SearchTypeText.CONTENT
})
export const searchBarModalOpenAtom = atom<boolean>(false)

export const searchResultAtom = atom<any[] | null>(null)
export const searchResultTypeAtom = atom<SearchType | null>(null)
export const isNoResultAtom = atom<boolean>((get) => get(searchResultAtom)?.length === 0)
export const didSearchAtom = atom<boolean>((get) => get(searchResultAtom) !== null)
