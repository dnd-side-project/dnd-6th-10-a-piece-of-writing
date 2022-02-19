import React from 'react'

import styled from 'styled-components'

import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const UserPostLabel: React.FC<Props> = ({}) => {
  return (
    <div className={'w-full border-y-1 border-gray-200 border-solid mt-8'}>
      <div className={`${CENTER_FLEX} my-3`}>
        <Span>올린 글조각</Span>
      </div>
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

export default UserPostLabel
