import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { topicSearchResultsAtom } from '@/atom/topic'
import { TopicCarousel } from '@/components/carousel'

type Props = {}

const UserTopicCarousel: React.FC<Props> = ({}) => {
  const userTopics = useAtomValue(topicSearchResultsAtom)
  return (
    <div className={'my-8 w-full'}>
      <div className={'ml-2'}>
        <TopicCarousel showAll={true} topics={userTopics} />
      </div>
    </div>
  )
}

export default UserTopicCarousel
