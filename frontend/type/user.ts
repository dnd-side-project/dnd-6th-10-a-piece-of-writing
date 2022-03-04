export type UserInfo = {
  id: number
  nickname: string
  profileUrl?: string
  email?: string
  alreadyFollow?: boolean
  followingCount?: number
  followerCount?: number
  authority?: string
} | null
