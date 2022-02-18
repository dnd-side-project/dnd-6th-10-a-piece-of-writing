import React from 'react'

import styled from 'styled-components'

import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const UserPostLabel: React.FC<Props> = ({}) => {
  return (
    <div className={'w-full'}>
      <Divider />
      <div className={`${CENTER_FLEX} my-3`}>
        <Span>올린 글조각</Span>
      </div>
      <Divider />
    </div>
  )
}

const Span = styled.span`
  font-size: 21px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: normal;
  color: #2c2c2c;
`

const Divider = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #e8e8e8;
`

export default UserPostLabel
