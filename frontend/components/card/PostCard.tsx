import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import MenuButton from '@/components/button/MenuButton'
import ShareButton from '@/components/button/ShareButton'
import CommentCard from '@/components/card/CommentCard'
import { MenuModalContainer } from '@/components/container/MenuModalContainer'
import CommentInput from '@/components/input/CommentInput'
import { TopicInfo } from '@/server/topic'
import { PostInfo } from '@/type/post'

import { FlexDiv } from '../style/div/FlexDiv'

type Props = {
  post: PostInfo | null
  topics: TopicInfo[]
}

const PostCard: React.FC<Props> = ({ post, topics }) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!post) {
      alert('올바르지 않은 글귀입니다!')
      router.back()
    }
  }, [post])

  if (!post) return null

  return (
    <>
      <PostCardContainer>
        <div className={'w-full flex mb-6 relative'}>
          <div className={'flex items-center'}>
            <Image src={post.authorInfo?.profileUrl ?? '/profile.svg'} width={24} height={24} alt={'profile'} />
            <p className={'text-overline ml-2'}>{post?.authorInfo?.nickname ?? '유저 닉네임'}</p>
          </div>
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
        <Image
          className={'rounded-xl'}
          src={post.imageUrl ?? 'https://fakeimg.pl/100x100/'}
          alt={'post'}
          width={386}
          height={386}
        />
        <div className={'flex flex-nowrap gap-1 my-6 whitespace-nowrap overflow-hidden hover:overflow-visible'}>
          {topics?.length > 0 ? (
            topics?.map((topic, i) => <TopicContainer key={topic.topicId ?? i}>{topic.name}</TopicContainer>)
          ) : (
            <span className={'text-t12 italic ml-2 text-gray-500'}>(토픽없음)</span>
          )}
        </div>
        <FlexDiv justify={'space-between'}>
          <LikeButton />
          <CommentButton />
          <DownloadButton />
          <ShareButton />
        </FlexDiv>
        <CommentCard nickName={'유저 닉네임'} text={'댓글 내용'} isMe={true} />
        <CommentInput />
      </PostCardContainer>
    </>
  )
}

const PostCardContainer = styled.div`
  width: 100%;
  padding: 0.8rem;

  @media screen and (min-width: 386px) {
    width: 386px;
  }
`

const TopicContainer = styled(FlexDiv)`
  height: 44px;
  border-radius: 30px;
  font-size: 14px;
  padding: 12px 24px;
  border: solid 1px #a1a1a1;
`

export default PostCard
