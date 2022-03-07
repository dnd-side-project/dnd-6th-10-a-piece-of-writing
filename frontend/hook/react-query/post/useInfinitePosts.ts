import { useInfiniteQuery } from 'react-query'

import { USE_INFINITE_POSTS_KEY } from '@/hook/react-query/key'
import { loadPosts, PostsParam } from '@/server/post'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useInfinitePosts = (postsParam: PostsParam) => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await loadPosts({ ...postsParam, page: pageParam })
    if (!response.success) alert(response.message)

    return {
      posts: response.data ?? [],
      nextPage: pageParam + 1,
      isLast: false,
    }
  }

  const query = useInfiniteQuery(USE_INFINITE_POSTS_KEY, fetchPosts, {
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
