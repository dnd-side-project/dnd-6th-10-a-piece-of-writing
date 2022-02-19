import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

const CommentButton: React.FC = () => {
  return (
    <IconContainer>
      <Image src={'/comment.svg'} width={24} height={24} />
    </IconContainer>
  )
}

export default CommentButton
