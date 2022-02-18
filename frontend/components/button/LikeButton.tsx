import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

type Props = {
  liked?: boolean
}

const LikeButton: React.FC<Props> = ({ liked = false }) => {
  return (
    <IconContainer>
      {liked ? <Image src={'/liked.svg'} width={24} height={24} /> : <Image src={'/like.svg'} width={24} height={24} />}
    </IconContainer>
  )
}

export default LikeButton
