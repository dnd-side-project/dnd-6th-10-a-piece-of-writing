import React from 'react'

import Image from 'next/image'

import FollowButton from '@/components/button/FollowButton'
import { Topic } from '@/components/carousel'
import { PlainDivider } from '@/components/Divider'
import Posts from '@/components/post/Posts'

type Props = {}

const NicknameSearchResult: React.FC<Props> = ({}) => {
  return (
    <div className={'flex flex-col'}>
      <p className={'my-7 text-t24'}>N명의 글쓴이를 찾았어요.</p>
      <div className={'flex mb-4 gap-2 align-middle items-center'}>
        <div className={'flex'}>
          <Image src={'/profile.svg'} width={48} height={48} alt={'profile'} />
        </div>
        <span className={'text-t16'}>유저 닉네임</span>
        <FollowButton />
      </div>
      <p className={'my-3 text-t14 text-gray-500'}>총 M개</p>
      <Posts />
      <p className={'mt-6 mb-10 text-t14 text-gray-500 underline cursor-pointer'}>모두 볼래요</p>
      <div className={'flex mb-8'}>
        <PlainDivider />
      </div>
      <div className={'flex mb-4'}>
        <Topic topicInfo={{ name: '토픽1' }} onClick={() => {}} />
      </div>
      <p className={'my-3 text-t14 text-gray-500'}>총 M개</p>
      <Posts />
      <p className={'mt-6 mb-10 text-t14 text-gray-500 underline cursor-pointer'}>모두 볼래요</p>
    </div>
  )
}

export default NicknameSearchResult
