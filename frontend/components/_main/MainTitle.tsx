import React from 'react'
import styled from 'styled-components'
import { BreakPoints } from '@/styles/breakPoint'

const MainTitle = () => {
  return <MainTitleSpan>{`오늘의 글 한 조각 \n 함께 음미하고 나눠보세요`}</MainTitleSpan>
}

export default MainTitle

const MainTitleSpan = styled.span`
  font-size: 24px;
  line-height: 1.56;
  white-space: pre-line;
  @media screen and (min-width: ${BreakPoints.md}) {
    font-size: 36px;
  }
`
