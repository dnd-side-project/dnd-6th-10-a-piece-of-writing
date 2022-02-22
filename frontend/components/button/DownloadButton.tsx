import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const DownloadButton: React.FC<Props> = ({ onClick = () => {} }) => {
  return (
    <IconContainer onClick={onClick}>
      <Image src={'/download.svg'} width={24} height={24} />
    </IconContainer>
  )
}

export default DownloadButton
