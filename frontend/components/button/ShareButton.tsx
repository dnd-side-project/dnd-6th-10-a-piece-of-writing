import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const ShareButton: React.FC<Props> = ({ onClick = () => {} }) => {
  return (
    <IconContainer onClick={onClick}>
      <Image src={'/share.svg'} width={24} height={24} />
    </IconContainer>
  )
}

export default ShareButton
