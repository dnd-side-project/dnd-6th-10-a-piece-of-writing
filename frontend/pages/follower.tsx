import React from 'react'

import styled from 'styled-components'

import Followers from '@/_follower/Followers'
import FollowLabel from '@/_follower/FollowLabel'
import { DUMMY_USERS } from '@/components/_user/type'
import { useSsrMe } from '@/hook/useSsrMe'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType }

const Follower: React.FC<ServerSideProps> = ({ me }) => {
  useSsrMe(me)

  return (
    <div className={`w-full ${CENTER_FLEX}`}>
      <Container>
        <div className={'my-10'}>
          <FollowLabel count={20} />
        </div>
        <Followers followers={DUMMY_USERS} />
      </Container>
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  margin-left: 1rem;

  @media screen and (min-width: 400px) {
    margin-left: 2rem;
  }

  @media screen and (min-width: 800px) {
    margin-left: 4rem;
  }

  @media screen and (min-width: 1201px) {
    width: 1201px;
    margin-left: 0;
  }
`
export const getServerSideProps = withAuthServerSideProps()

export default Follower
