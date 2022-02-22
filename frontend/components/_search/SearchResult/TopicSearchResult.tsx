import React from 'react'

import { Tag } from '@/components/carousel'
import { PlainDivider } from '@/components/Divider'
import Posts from '@/components/post/Posts'

type Props = {}

const TopicSearchResult: React.FC<Props> = ({}) => {
  return (
    <div className={'flex flex-col'}>
      <p className={'my-7 text-t24'}>N개의 토픽이 있네요.</p>
      <div className={'flex mb-4'}>
        <Tag tagInfo={{ name: '토픽1' }} onClick={() => {}} />
      </div>
      <p className={'my-3 text-t14 text-gray-500'}>총 M개</p>
      <Posts />
      <p className={'mt-6 mb-10 text-t14 text-gray-500 underline cursor-pointer'}>모두 볼래요</p>
      <div className={'flex mb-8'}>
        <PlainDivider />
      </div>
      <div className={'flex mb-4'}>
        <Tag tagInfo={{ name: '토픽1' }} onClick={() => {}} />
      </div>
      <p className={'my-3 text-t14 text-gray-500'}>총 M개</p>
      <Posts />
      <p className={'mt-6 mb-10 text-t14 text-gray-500 underline cursor-pointer'}>모두 볼래요</p>
    </div>
  )
}

export default TopicSearchResult
