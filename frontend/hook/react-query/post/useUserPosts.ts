import { useQuery } from 'react-query'

import { USE_USER_POSTS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadUserPosts } from '@/server/post'
import { PostInfo } from '@/type/post'

export const useUserPosts = (userId: number) => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<PostInfo[]>, Error>(
    [USE_USER_POSTS_KEY, userId],
    async () => loadUserPosts(userId),
    { refetchInterval: 60 * 60 * 60 },
  )
  return { isError: !data?.success || isError, isLoading, userPosts: data?.data ?? [], isSuccess }
}
