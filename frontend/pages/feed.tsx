import React from 'react'

import styled from 'styled-components'

import MainTitle from '@/components/_main/MainTitle'
import Posts from '@/components/_main/Posts'
import { TagCarousel } from '@/components/carousel'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const feed: React.FC<Props> = ({}) => {
  return (
    <div className={`${CENTER_FLEX} flex-col w-full`}>
      <MainContainer>
        <MainTitle />
        <FlexDiv margin={'2.5rem 0 0 0 '}>
          <div className={'w-full'}>
            <TagCarousel tags={DUMMY_TAGS} onClickTag={(_) => () => {}} />
          </div>
        </FlexDiv>
        <FlexDiv width={'100%'}>
          <Posts />
        </FlexDiv>
      </MainContainer>
    </div>
  )
}

const MainContainer = styled.div`
  max-width: 1201px;
  margin-left: 1.3rem;
  margin-top: 1.3rem;
  width: 100%;
  @media screen and (min-width: 1201px) {
    margin-left: 0;
    width: auto;
  }
`

const DUMMY_TAGS = [
  {
    name: '동기부여',
    isChecked: false,
  },
  {
    name: '공부',
    isChecked: false,
  },
  {
    name: '인생',
    isChecked: true,
  },
  {
    name: '감성',
    isChecked: true,
  },
  {
    name: '위로',
    isChecked: false,
  },
  {
    name: '월요일',
    isChecked: false,
  },
]

export default feed
