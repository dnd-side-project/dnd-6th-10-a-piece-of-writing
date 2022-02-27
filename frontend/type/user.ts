export type UserInfo = {
  id: number
  nickname: string
  profileUrl?: string
  email?: string
  alreadyFollow?: boolean
  follow?: number
  follower?: number
  authority?: string
} | null
