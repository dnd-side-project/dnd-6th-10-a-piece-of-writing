import React from 'react'

import styled from 'styled-components'

import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const UserPostLabel: React.FC<Props> = ({}) => {
  const isSelected = true
  return (
    <div className={'w-full border-solid mt-8'}>
      {/*<div className={`${CENTER_FLEX} my-3 border-y-1 border-gray-200`}>*/}
      {/*  <Span>올린 글조각</Span>*/}
      {/*</div>*/}
      <div className={'flex w-full'}>
        <div
          className={`w-1/2 ${CENTER_FLEX} hover:bg-blue-100 cursor-pointer border-solid border-y-1 border-y-gray-200 py-3 ${
            isSelected ? 'border-b-gray-600' : ''
          }`}>
          <Span>나의 글조각</Span>
        </div>
        <div
          className={`w-1/2 ${CENTER_FLEX} hover:bg-blue-100 cursor-pointer border-solid  border-y-1 border-y-gray-200 py-3 ${
            !isSelected ? 'border-b-gray-600' : ''
          }`}>
          <Span>나의 좋아요</Span>
        </div>
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
