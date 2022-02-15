import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/_main/Post'

const DownloadButton: React.FC = () => {
  return (
    <IconContainer>
      <Image src={'/download.svg'} width={24} height={24} />
    </IconContainer>
  )
}

export default DownloadButton
