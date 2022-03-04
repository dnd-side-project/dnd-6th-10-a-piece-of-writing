import { UserInfo } from '@/type/user'

export type ReplyInfo = {
  replyId: number
  text: string
  replyer?: UserInfo
  createdDate?: string
  modifiedDate?: string
}
