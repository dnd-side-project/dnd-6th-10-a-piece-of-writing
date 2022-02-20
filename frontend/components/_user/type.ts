export type UserInfo = {
  id: string
  nickname: string
  image?: string
  email?: string
  followed?: boolean
}

export const DUMMY_USER1: UserInfo = {
  id: '1',
  nickname: '닉네임',
  image: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: true,
}
export const DUMMY_USER2: UserInfo = {
  id: '12',
  nickname: '닉네임2',
  image: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: true,
}

export const DUMMY_USER3: UserInfo = {
  id: '13',
  nickname: '닉네임3',
  image: 'https://fakeimg.pl/100x100/',
  email: 'ddrrpg@naver.com',
  followed: false,
}

export const DUMMY_USERS = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3]
