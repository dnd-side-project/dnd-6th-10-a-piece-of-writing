import { useAtomValue } from 'jotai/utils'
import { useQuery } from 'react-query'

import { meAtom } from '@/atom/user/me'
import { USE_MY_POSTS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadMyPosts } from '@/server/post'
import { PostInfo } from '@/type/post'

export const useMyPosts = () => {
  const me = useAtomValue(meAtom)
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<PostInfo[]>, Error>(
    [USE_MY_POSTS_KEY, me?.id ?? ''],
    async () => loadMyPosts(),
  )
  return { isError: !data?.success || isError, isLoading, myPosts: data?.data ?? [], isSuccess }
}
