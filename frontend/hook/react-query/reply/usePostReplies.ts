import { useQuery } from 'react-query'

import { USE_POST_REPLIES_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { getPostReplies } from '@/server/reply/post'
import { ReplyInfo } from '@/type/reply'

export const usePostReplies = (postId: number) => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<ReplyInfo[]>, Error>(
    [USE_POST_REPLIES_KEY, postId],
    async () => getPostReplies(postId),
    { refetchInterval: 60 * 60 * 60 },
  )
  return { isError: !data?.success || isError, isLoading, replies: data?.data ?? [], isSuccess }
}
