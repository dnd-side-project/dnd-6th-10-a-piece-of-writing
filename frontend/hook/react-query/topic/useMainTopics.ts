import { useQuery } from 'react-query'

import { USE_MAIN_TOPICS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadMainTopics, TopicInfo } from '@/server/topic'

export const useMainTopics = () => {
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<TopicInfo[]>, Error>(
    [USE_MAIN_TOPICS_KEY],
    async () => loadMainTopics(),
  )
  return { isError: !data?.success || isError, isLoading, topics: data?.data ?? [], isSuccess }
}
