import React from 'react'

import Image from 'next/image'
import styled from 'styled-components'

import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = {}

const AddButton: React.FC<Props> = ({}) => {
  return (
    <AddButtonContainer>
      <Image src={'/add.svg'} width={24} height={24} alt={'add'} />
    </AddButtonContainer>
  )
}

const AddButtonContainer = styled(FlexDiv)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 8px;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 2px #2c2c2c;
  background-color: #fff;
`

export default AddButton
