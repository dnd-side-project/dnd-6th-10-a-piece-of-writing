import React from 'react'

import { useAtomValue } from 'jotai/utils'
import Link from 'next/link'
import styled from 'styled-components'

import { userInfoAtom } from '@/atom/user/me'
import { CENTER_FLEX, HOVER_BLUE } from '@/styles/classNames'

type Props = {}

const UserSummaryCard: React.FC<Props> = () => {
  const userInfo = useAtomValue(userInfoAtom)
  return (
    <Conatiner>
      <div className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium ${HOVER_BLUE} cursor-pointer`}>{0} 글조각</div>
      <Link href={`/follower/${userInfo?.id ?? 1}`}>
        <div className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium cursor-pointer ${HOVER_BLUE} `}>
          {userInfo?.follower ?? 0} 팔로워
        </div>
      </Link>
      <Link href={`/following/${userInfo?.id ?? 1}`}>
        <div className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium ${HOVER_BLUE} cursor-pointer`}>
          {userInfo?.follow ?? 0} 팔로잉
        </div>
      </Link>
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
