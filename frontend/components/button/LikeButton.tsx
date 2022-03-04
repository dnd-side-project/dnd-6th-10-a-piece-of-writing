import React, { useState } from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'
import { useIsMyPost } from '@/hook/useIsMyPost'
import { like, unlike } from '@/server/post/like'

type Props = {
  liked?: boolean
  postId?: number
}

const LikeButton: React.FC<Props> = ({ liked = false, postId }) => {
  const isMyPost = useIsMyPost(postId)
  const [_liked, setLiked] = useState(liked)

  const onClickLike = () => {
    if (!postId) {
      alert('게시글을 불러오는 데에 에러가 발생했습니다.')
      return
    }
    if (isMyPost) {
      alert('자신의 게시글에는 좋아요할 수 없습니다.')
      return
    }

    if (_liked) {
      unlike(postId).then((res) => {
        alert(res.message)
        if (res.success) setLiked(false)
      })
      return
    }

    like(postId).then((res) => {
      alert(res.message)
      if (res.success) setLiked(true)
    })
  }

  return (
    <IconContainer onClick={onClickLike}>
      {_liked || isMyPost ? (
        <Image src={'/liked.svg'} width={24} height={24} />
      ) : (
        <Image src={'/like.svg'} width={24} height={24} />
      )}
    </IconContainer>
  )
}

export default LikeButton
