import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { isTopicSearchModalOpenAtom } from '@/atom/topic'
import TopicSearchBar from '@/components/input/TopicSearchBar'
import TopicSearchModal from '@/components/modal/TopicSearchModal'

type Props = {}

const TopicSearch: React.FC<Props> = ({}) => {
  const isTopicSearchModalOpen = useAtomValue(isTopicSearchModalOpenAtom)

  return (
    <>
      <TopicSearchBar />
      {isTopicSearchModalOpen && <TopicSearchModal />}
    </>
  )
}

export default TopicSearch
