import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { topicsAtom } from '@/atom/topic'
import { TopicCarousel } from '@/components/carousel'
import TopicSearchBar from '@/components/input/TopicSearchBar'
import TopicSearchModal from '@/components/modal/TopicSearchModal'

type Props = {}

const TopicSearch: React.FC<Props> = ({}) => {
  const topics = useAtomValue(topicsAtom)

  return (
    <>
      <TopicCarousel topics={topics} />
      <TopicSearchBar />
      <TopicSearchModal />
    </>
  )
}

export default TopicSearch
