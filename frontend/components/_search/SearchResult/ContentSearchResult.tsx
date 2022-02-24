import React from 'react'

import Posts from '@/components/post/Posts'

type Props = {}

const ContentSearchResult: React.FC<Props> = ({}) => {
  return (
    <div className={'flex flex-col'}>
      <p className={'my-7 text-t24'}>N개의 글이 있네요.</p>
      <Posts />
    </div>
  )
}

export default ContentSearchResult
