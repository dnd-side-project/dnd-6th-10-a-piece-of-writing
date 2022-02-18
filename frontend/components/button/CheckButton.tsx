import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/container/IconContainer'

export enum CheckButtonColor {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  ORANGE = 'ORANGE',
}

type Props = {
  width?: number
  height?: number
  color?: CheckButtonColor
  transparent?: boolean
  noContainer?: boolean
  containerWidth?: string
  containerHeight?: string
}

const CheckButton: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = CheckButtonColor.BLACK,
  noContainer = false,
  transparent = false,
  containerWidth,
  containerHeight,
}) => {
  if (noContainer)
    return (
      <>
        {color === CheckButtonColor.BLACK && (
          <Image src={'/post_check.svg'} width={width} height={height} alt={'check'} />
        )}
        {color === CheckButtonColor.WHITE && (
          <Image src={'/post_check_white.svg'} width={width} height={height} alt={'check'} />
        )}
        {color === CheckButtonColor.ORANGE && (
          <Image src={'/post_check_orange.svg'} width={width} height={height} alt={'check'} />
        )}
      </>
    )
  return (
    <IconContainer width={containerWidth} height={containerHeight} transparent={transparent}>
      {color === CheckButtonColor.BLACK && (
        <Image src={'/post_check.svg'} width={width} height={height} alt={'check'} />
      )}
      {color === CheckButtonColor.WHITE && (
        <Image src={'/post_check_white.svg'} width={width} height={height} alt={'check'} />
      )}
      {color === CheckButtonColor.ORANGE && (
        <Image src={'/post_check_orange.svg'} width={width} height={height} alt={'check'} />
      )}
    </IconContainer>
  )
}

export default CheckButton
