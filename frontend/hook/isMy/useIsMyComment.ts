import { useAtomValue } from 'jotai/utils'

import { meAtom } from '@/atom/user/me'
import { ReplyInfo } from '@/type/reply'

export const useIsMyComment = (comment?: ReplyInfo) => {
  const me = useAtomValue(meAtom)
  if (!comment?.replyId || !me?.id) return false
  return me?.id === comment?.replyId
}
