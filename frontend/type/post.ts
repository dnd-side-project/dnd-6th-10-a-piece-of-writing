import { UserInfo } from '@/type/user'

export type PostInfo = {
  id?: number
  postsId: number
  content: string
  imageUrl: string
  ref?: string
  authorInfo?: UserInfo
  createdDate?: '2022-02-19T21:38:13'
  modifiedDate?: '2022-02-19T21:38:13'
  alreadyLike?: boolean
}
