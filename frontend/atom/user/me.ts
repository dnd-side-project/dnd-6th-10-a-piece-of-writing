import { atom } from 'jotai'

import { UserInfo } from '@/components/_user/type'

export const meAtom = atom<UserInfo | null>(null)
export const isLoginedAtom = atom((get) => get(meAtom) !== null)
