import React, { useState } from 'react'

import Image from 'next/image'
import styled from 'styled-components'

import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import MenuButton from '@/components/button/MenuButton'
import ShareButton from '@/components/button/ShareButton'
import CommentCard from '@/components/card/CommentCard'
import { MenuModalContainer } from '@/components/container/MenuModalContainer'

import { FlexDiv } from '../style/div/FlexDiv'

type Props = {
  imageUrl: string
}

const PostCard: React.FC<Props> = ({ imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <PostCardContainer>
        <div className={'w-full flex mb-6 relative'}>
          <Image src={'/profile.svg'} width={24} height={24} alt={'profile'} />
          <p className={'text-overline'}>유저 닉네임</p>
          <MenuButton
            onClick={() => {
              setIsModalOpen((open) => !open)
            }}
          />
          {isModalOpen && (
            <MenuModalContainer>
              <div className={'cursor-pointer'}>삭제하기</div>
            </MenuModalContainer>
          )}
        </div>
        <Image className={'rounded-xl'} src={imageUrl} alt={'post'} width={386} height={386} />
        <div className={'flex flex-nowrap gap-1 my-6 whitespace-nowrap overflow-hidden hover:overflow-visible'}>
          <TagContainer>감성</TagContainer>
          <TagContainer>나만의글</TagContainer>
          <TagContainer>명언</TagContainer>
          <TagContainer>로맨틱</TagContainer>
          <TagContainer>기분전환</TagContainer>
        </div>
        <FlexDiv justify={'space-between'}>
          <LikeButton />
          <CommentButton />
          <DownloadButton />
          <ShareButton />
        </FlexDiv>
        <CommentCard nickName={'유저 닉네임'} text={'댓글 내용'} />
      </PostCardContainer>
    </>
  )
}

const PostCardContainer = styled.div`
  width: 386px;
`

const TagContainer = styled(FlexDiv)`
  height: 44px;
  border-radius: 30px;
  font-size: 14px;
  padding: 12px 24px;
  border: solid 1px #a1a1a1;
`

export default PostCard
