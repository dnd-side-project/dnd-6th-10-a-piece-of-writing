import React from 'react'

import Image from 'next/image'

import { IconContainer } from '@/components/_main/Post'

type Props = {
  transparent?: boolean
}

const EditButton: React.FC<Props> = ({ transparent = false }) => {
  return (
    <IconContainer transparent={transparent}>
      <Image src={'/edit.svg'} width={24} height={24} />
    </IconContainer>
  )
}

export default EditButton
