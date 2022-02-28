import { UserInfo } from '@/type/user'

export type UserInfoSure = {
  id: number
  nickname: string
  profileUrl?: string
  email?: string
  followed?: boolean
  authority?: string
}

export const DUMMY_USER1: UserInfo = {
  id: 112,
  nickname: '닉네임',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  alreadyFollow: true,
}
export const DUMMY_USER2: UserInfo = {
  id: 12,
  nickname: '닉네임2',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  alreadyFollow: true,
}

export const DUMMY_USER3: UserInfo = {
  id: 13,
  nickname: '닉네임3',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  alreadyFollow: false,
}

export const DUMMY_USERS = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3]
