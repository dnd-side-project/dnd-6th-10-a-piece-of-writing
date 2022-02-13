import React from 'react'

import Image from 'next/image'
import styled from 'styled-components'

import { IconContainer } from '@/components/_main/Post'
import CommentCard from '@/components/card/CommentCard'

import { FlexDiv } from '../style/div/FlexDiv'

type Props = {
  imageUrl: string
}

const PostCard: React.FC<Props> = ({ imageUrl }) => {
  return (
    <>
      <PostCardContainer>
        <div className={'w-full flex mb-6'}>
          <Image src={'/profile.svg'} width={24} height={24} alt={'profile'} />
          <p className={'text-overline'}>유저 닉네임</p>
          <Image src={'/dots-vertical.svg'} width={24} height={24} alt={'dots-vertical'} />
        </div>
        <Image className={'rounded-xl'} src={imageUrl} alt={'post'} width={386} height={386} />
        <FlexDiv justify={'space-between'}>
          <IconContainer>
            <Image src={'/like.svg'} width={24} height={24} alt={'like'} />
          </IconContainer>
          <IconContainer>
            <Image src={'/comment.svg'} width={24} height={24} alt={'comment'} />
          </IconContainer>
          <IconContainer>
            <Image src={'/download.svg'} width={24} height={24} alt={'download'} />
          </IconContainer>
          <IconContainer>
            <Image src={'/share.svg'} width={24} height={24} alt={'share'} />
          </IconContainer>
        </FlexDiv>
        <CommentCard nickName={'유저 닉네임'} text={'댓글 내용'} />
      </PostCardContainer>
    </>
  )
}

const PostCardContainer = styled.div`
  width: 386px;
`
export default PostCard
