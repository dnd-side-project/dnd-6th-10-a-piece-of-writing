import React from 'react'

import Link from 'next/link'
import styled from 'styled-components'

import { UserInfo as UserInfoType } from '@/components/_user/type'
import { Button } from '@/components/button'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import useNeedLogin from '@/hook/useNeedLogin'
import { useSsrMe } from '@/hook/useSsrMe'
import { withdraw } from '@/server/user'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { BreakPoints } from '@/styles/breakPoint'

type ServerSideProps = { me: UserInfoType }

const Withdraw: React.FC<ServerSideProps> = ({ me }) => {
  useSsrMe(me)
  useNeedLogin()

  const onClickWithdraw = () => {
    if (!confirm('정말로 탈퇴하시겠습니까?')) return
    withdraw().then((res) => alert(res.message))
  }

  return (
    <FlexDiv>
      <MainContainer>
        <div className={'text-h2 whitespace-pre-line md:text-h1'}>{'다음에 생각나면 \n 언제든 찾아와주세요'}</div>
        <div className={'mt-10 text-button whitespace-pre-line text-link md:text-overline'}>
          {'함께여서 즐거웠습니다. \n 탈퇴 시 모든 게시물은 삭제됩니다.'}
        </div>
        <FlexDiv margin={'7rem 0 0 0'} direction={'column'}>
          <Button width={'285px'} onClick={onClickWithdraw}>
            탈퇴하기
          </Button>
          <Link href={'/'} passHref>
            <Button className={'mt-4'} bgColor={'#8e8e8e'} width={'285px'}>
              취소하기
            </Button>
          </Link>
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

export const getServerSideProps = withAuthServerSideProps()

export default Withdraw
