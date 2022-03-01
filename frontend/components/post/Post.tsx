import React from 'react'

import Image from 'next/image'
import { useHover } from 'react-use'
import styled from 'styled-components'

import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import ShareButton from '@/components/button/ShareButton'
import { PostInfo } from '@/type/post'
import { download, share } from '@/util'

type Props = {
  post: PostInfo
}

const Post: React.FC<Props> = ({ post }) => {
  const imgUrl = 'https://fakeimg.pl/300/'

  const element = (hovered: boolean) => (
    <PostContainer>
      <div className={'absolute w-full h-full rounded'}>
        <Image className={'rounded-xl'} src={post?.imageUrl ?? imgUrl} width={285} height={285} />
      </div>
      {hovered ? (
        <div className={'absolute w-full h-full'}>
          <NickNameContainer>
            <Image src={post?.authorInfo?.profileUrl ?? '/profile.svg'} width={24} height={24} />
            <p className={'text-overline'}>유저 닉네임</p>
          </NickNameContainer>
          <div className={'mt-185px w-full flex flex-wrap justify-around'}>
            <LikeButton />
            <CommentButton />
            <DownloadButton onClick={() => download(post.imageUrl ?? imgUrl)} />
            <ShareButton onClick={() => share(post.imageUrl ?? imgUrl)} />
          </div>
        </div>
      ) : (
        ''
      )}
    </PostContainer>
  )

  const [hoverable] = useHover(element)

  return <>{hoverable}</>
}

export default Post

const NickNameContainer = styled.div`
  width: 117px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  margin-left: 16px;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`

const PostContainer = styled.div`
  width: 285px;
  height: 285px;
  position: relative;
  border-radius: 13px;
  background-color: #e8e8e8;
`
