import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { tagsAtom } from '@/atom/tag'
import { TagCarousel } from '@/components/carousel'
import TagSearchBar from '@/components/input/TagSearchBar'
import TagSearchModal from '@/components/modal/TagSearchModal'

type Props = {}

const TagSearch: React.FC<Props> = ({}) => {
  const tags = useAtomValue(tagsAtom)

  return (
    <>
      <TagCarousel tags={tags} />
      <TagSearchBar />
      <TagSearchModal />
    </>
  )
}

export default TagSearch
