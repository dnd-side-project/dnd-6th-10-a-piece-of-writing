import { atom } from 'jotai'

export enum ProfileTab {
  POST = 'POST',
  LIKE = 'LIKE',
}

export const userProfileTabAtom = atom<ProfileTab>(ProfileTab.POST)
