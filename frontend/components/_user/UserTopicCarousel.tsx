import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { topicSearchResultsAtom } from '@/atom/topic'
import { TopicCarousel } from '@/components/carousel'
import { UserInfo } from '@/type/user'

type Props = {
  userInfo: UserInfo
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserTopicCarousel: React.FC<Props> = ({ userInfo }) => {
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
