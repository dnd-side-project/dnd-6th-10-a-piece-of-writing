import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { tagSearchResultsAtom } from '@/atom/tag'
import { TagCarousel } from '@/components/carousel'

type Props = {}

const UserTagCarousel: React.FC<Props> = ({}) => {
  const userTags = useAtomValue(tagSearchResultsAtom)
  return (
    <div className={'my-8 w-full'}>
      <div className={'ml-2'}>
        <TagCarousel showAll={true} tags={userTags} />
      </div>
    </div>
  )
}

export default UserTagCarousel
