import React from 'react'

import styled from 'styled-components'

import FollowerLabel from '@/_follower/FollowerLabel'
import Followers from '@/_follower/Followers'
import { DUMMY_USERS } from '@/components/_user/type'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const Follower: React.FC<Props> = ({}) => {
  return (
    <div className={`w-full ${CENTER_FLEX}`}>
      <Container>
        <div className={'mb-10'}>
          <FollowerLabel />
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

export default Follower
