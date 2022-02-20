export type UserInfo = {
  memberId: string
  nickname: string
  profileUrl?: string
  email?: string
  followed?: boolean
  authority?: string
} | null

export const DUMMY_USER1: UserInfo = {
  memberId: '1',
  nickname: '닉네임',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: true,
}
export const DUMMY_USER2: UserInfo = {
  memberId: '12',
  nickname: '닉네임2',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: true,
}

export const DUMMY_USER3: UserInfo = {
  memberId: '13',
  nickname: '닉네임3',
  profileUrl: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: false,
}

export const DUMMY_USERS = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3]
