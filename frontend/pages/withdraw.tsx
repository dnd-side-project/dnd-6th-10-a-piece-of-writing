import React from 'react'

import styled from 'styled-components'

import { Button } from '@/components/button'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { BreakPoints } from '@/styles/breakPoint'

type Props = {}

const Withdraw: React.FC<Props> = ({}) => {
  return (
    <FlexDiv>
      <MainContainer>
        <div className={'text-h2 whitespace-pre-line md:text-h1'}>{'다음에 생각나면 \n 언제든 찾아와주세요'}</div>
        <div className={'mt-10 text-button whitespace-pre-line text-link md:text-overline'}>
          {'함께여서 즐거웠습니다. \n 탈퇴 시 모든 게시물은 삭제됩니다.'}
        </div>
        <FlexDiv margin={'7rem 0 0 0'} direction={'column'}>
          <Button width={'285px'}>탈퇴하기</Button>
          <Button className={'mt-4'} width={'285px'}>
            취소하기
          </Button>
        </FlexDiv>
      </MainContainer>
    </FlexDiv>
  )
}

const MainContainer = styled.div`
  margin-top: 10rem;
  @media screen and (min-width: ${BreakPoints.md}) {
    margin-top: 15rem;
  }
`

export default Withdraw
