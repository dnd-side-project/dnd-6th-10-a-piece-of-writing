import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { IconContainer } from '@/components/container/IconContainer'

type Props = {
  postId: number
}

const GotoButton: React.FC<Props> = ({ postId }) => {
  return (
    <IconContainer>
      <Link href={`/post/${postId}`}>
        <Image src={'/go-to-reverse.png'} width={24} height={24} />
      </Link>
    </IconContainer>
  )
}

export default GotoButton
