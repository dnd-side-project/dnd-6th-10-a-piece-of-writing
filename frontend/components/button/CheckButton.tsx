import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

type Props = {
  width?: number
  height?: number
  containerWidth?: string
  containerHeight?: string
}

const CheckButton: React.FC<Props> = ({ width = 24, height = 24, containerWidth, containerHeight }) => {
  return (
    <IconContainer width={containerWidth} height={containerHeight}>
      <Image src={'/post_check.svg'} width={width} height={height} alt={'check'} />
    </IconContainer>
  )
}

export default CheckButton
