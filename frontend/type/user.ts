export type UserInfo = {
  id: number
  nickname: string
  profileUrl?: string
  email?: string
  alreadyFollow?: boolean
  postsCount?: number
  followerCount?: number
  followingCount?: number
  authority?: string
} | null
