import { useQuery } from 'react-query'

import { USE_SEARCH_TOPICS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { searchTopic, TopicInfo } from '@/server/topic'

export const useSearchTopics = (name: string) => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<TopicInfo[]>, Error>(
    [USE_SEARCH_TOPICS_KEY, name],
    async () => searchTopic(name),
  )
  return { isError: !data?.success || isError, isLoading, searchTopics: data?.data ?? [], isSuccess }
}
