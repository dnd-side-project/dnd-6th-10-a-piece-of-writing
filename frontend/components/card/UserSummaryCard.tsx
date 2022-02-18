import React from 'react'

import styled from 'styled-components'

import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  post?: number
  followerCount?: number
  followingCount?: number
}

const UserSummaryCard: React.FC<Props> = ({ post = 0, followerCount = 0, followingCount = 0 }) => {
  return (
    <Conatiner>
      <div className={`${CENTER_FLEX} text-t16 font-medium`}>{post} 글조각</div>
      <div className={`${CENTER_FLEX} text-t16 font-medium`}>{followerCount} 팔로워</div>
      <div className={`${CENTER_FLEX} text-t16 font-medium`}>{followingCount} 팔로잉</div>
    </Conatiner>
  )
}

const Conatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100vw;
  @media screen and (min-width: 444px) {
    width: 444px;
  }
`

export default UserSummaryCard
