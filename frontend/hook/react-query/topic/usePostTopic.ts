import { useQuery } from 'react-query'

import { USE_POST_TOPICS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { TopicInfo } from '@/server/topic'
import { loadPostTopics } from '@/server/topic/post'

export const usePostTopics = (postId: number) => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<TopicInfo[]>, Error>(
    [USE_POST_TOPICS_KEY, postId],
    async () => loadPostTopics(postId),
  )
  return { isError: !data?.success || isError, isLoading, topics: data?.data ?? [], isSuccess }
}
