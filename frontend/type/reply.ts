import { UserInfo } from '@/type/user'

export type ReplyInfo = {
  replyId?: number
  id?: number
  text: string
  replyer?: UserInfo
  replyerNickname?: string
  replyerEmail?: string
  replyerId?: number
  createdDate?: string
  modifiedDate?: string
}
