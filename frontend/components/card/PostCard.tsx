import React, { useState } from 'react'

import Image from 'next/image'
import styled from 'styled-components'

import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import ShareButton from '@/components/button/ShareButton'
import CommentCard from '@/components/card/CommentCard'

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
          <div
            className={'ml-auto cursor-pointer'}
            onClick={() => {
              setIsModalOpen((open) => !open)
            }}>
            <Image src={'/dots-vertical.svg'} width={24} height={24} alt={'dots-vertical'} />
          </div>
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

const MenuModalContainer = styled.div`
  position: absolute;
  width: 228px;
  right: -204px;
  top: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  transition: opacity 0.5s;
  font-size: 14px;
`

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
