import { atom } from 'jotai'

import { UserInfoSure } from '@/components/_user/type'
import { UserInfo } from '@/type/user'

export const meAtom = atom<UserInfo>(null)
export const setNicknameAtom = atom(null, (get, set, nickname: string) => {
  if (!get(meAtom)) return console.log('meAtom이 null입니다.')
  set(meAtom, { ...(get(meAtom) as UserInfoSure), nickname })
})
export const modifyingMeNicknameAtom = atom<string>((get) => get(meAtom)?.nickname ?? '')
export const isLoginedAtom = atom((get) => get(meAtom) !== null)

export const userInfoAtom = atom<UserInfo>(null)
