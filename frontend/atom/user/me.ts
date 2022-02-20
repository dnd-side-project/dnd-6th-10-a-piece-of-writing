import { atom } from 'jotai'

import { UserInfo } from '@/components/_user/type'

export const meAtom = atom<UserInfo>(null)
export const modifyingMeNicknameAtom = atom<string>((get) => get(meAtom)?.nickname ?? '')
export const isLoginedAtom = atom((get) => get(meAtom) !== null)
