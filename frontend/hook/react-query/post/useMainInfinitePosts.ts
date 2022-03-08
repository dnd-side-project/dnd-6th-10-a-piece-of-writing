import { useInfiniteQuery } from 'react-query'

import { USE_INFINITE_MAIN_POSTS_KEY } from '@/hook/react-query/key'
import { loadMainPosts } from '@/server/post'

export const useMainInfinitePosts = () => {
  const fetchPosts = async ({ pageParam = 1, size = 10 }) => {
    const response = await loadMainPosts({ page: pageParam, size })
    if (!response.success) alert(response.message)

    return {
      posts: response.data ?? [],
      nextPage: pageParam + 1,
      isLast: false,
    }
  }

  const query = useInfiniteQuery(USE_INFINITE_MAIN_POSTS_KEY, fetchPosts, {
    getNextPageParam: (res) => {
      if (!res.isLast) return res.nextPage
      return undefined
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  })
  return query
}
