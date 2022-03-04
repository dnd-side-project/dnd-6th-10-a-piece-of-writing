import React, { useEffect, useState } from 'react'

import { useAtomValue } from 'jotai/utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { meAtom } from '@/atom/user/me'
import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import MenuButton from '@/components/button/MenuButton'
import ShareButton from '@/components/button/ShareButton'
import CommentCard from '@/components/card/CommentCard'
import { MenuModalContainer } from '@/components/container/MenuModalContainer'
import CommentInput from '@/components/input/CommentInput'
import { deletePost } from '@/server/post'
import { TopicInfo } from '@/server/topic'
import { PostInfo } from '@/type/post'
import { ReplyInfo } from '@/type/reply'

import { FlexDiv } from '../style/div/FlexDiv'

type Props = {
  post: PostInfo | null
  topics: TopicInfo[]
}

export const DUMMY_COMMENT: ReplyInfo = {
  replyId: 11,
  text: 'Postsman text test 22/02/21',
  replyer: {
    id: 1,
    nickname: 'tester01',
    profileUrl: 'https://storage.googleapis.com/example-ocr-test/67954529-47c3-49c0-ae2b-efa5174404f7',
  },
}

const PostCard: React.FC<Props> = ({ post, topics }) => {
  const router = useRouter()
  const me = useAtomValue(meAtom)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isMyCard = me?.id === post?.authorInfo?.id

  useEffect(() => {
    if (!post) {
      alert('올바르지 않은 글귀입니다!')
      router.back()
    }
  }, [post])

  const onClickDelete = () => {
    post?.postsId &&
      deletePost(post?.postsId).then((res) => {
        alert(res.message)
      })
  }

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
          {isModalOpen && isMyCard && (
            <MenuModalContainer>
              <div className={'cursor-pointer'} onClick={onClickDelete}>
                삭제하기
              </div>
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
          <LikeButton liked={post.alreadyLike} postId={post.postsId} />
          <CommentButton />
          <DownloadButton />
          <ShareButton />
        </FlexDiv>
        <CommentCard comment={DUMMY_COMMENT} />
        <CommentInput postId={post.postsId} />
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
