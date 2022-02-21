import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = { sticky?: boolean; href?: string }

const AddButton: React.FC<Props> = ({ sticky = false, href = '/upload' }) => {
  return (
    <AddButtonContainer sticky={sticky}>
      <Link href={href}>
        <Image src={'/add.svg'} width={24} height={24} alt={'add'} />
      </Link>
    </AddButtonContainer>
  )
}

type AddButtonContainerProps = { sticky?: boolean }

const AddButtonContainer = styled(FlexDiv)`
  position: ${(props: AddButtonContainerProps) => (props.sticky ? 'sticky' : 'static')};
  margin-right: ${(props: AddButtonContainerProps) => (props.sticky ? '1.5rem' : 'auto')};
  bottom: ${(props: AddButtonContainerProps) => (props.sticky ? '1rem' : 'auto')};
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
