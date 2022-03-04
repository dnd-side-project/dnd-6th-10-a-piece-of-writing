import { useQuery } from 'react-query'

import { USE_POST_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadPost } from '@/server/post'
import { PostInfo } from '@/type/post'

export const usePost = (postId: number) => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<PostInfo>, Error>(
    [USE_POST_KEY, postId],
    async () => loadPost(postId),
  )
  return { isError: !data?.success || isError, isLoading, post: data?.data ?? null, isSuccess }
}
