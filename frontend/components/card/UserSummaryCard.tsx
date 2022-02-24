import React from 'react'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import styled from 'styled-components'

import { isFollowerModalOpenAtom, isFollowingModalOpenAtom } from '@/atom/user/follow'
import { userInfoAtom } from '@/atom/user/me'
import { CENTER_FLEX, HOVER_BLUE } from '@/styles/classNames'

type Props = {}

const UserSummaryCard: React.FC<Props> = () => {
  const userInfo = useAtomValue(userInfoAtom)
  const setIsFollowerModalOpen = useUpdateAtom(isFollowerModalOpenAtom)
  const setIsFollowingModalOpen = useUpdateAtom(isFollowingModalOpenAtom)

  return (
    <Container>
      <div className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium ${HOVER_BLUE} cursor-pointer`}>{0} 글조각</div>
      {/*<Link href={`/follower/${userInfo?.id ?? 1}`}>*/}
      <div
        className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium cursor-pointer ${HOVER_BLUE} `}
        onClick={() => setIsFollowerModalOpen(true)}>
        {userInfo?.follower ?? 0} 팔로워
      </div>
      {/*</Link>*/}
      {/*<Link href={`/following/${userInfo?.id ?? 1}`}>*/}
      <div
        className={`${CENTER_FLEX} p-1 px-3 text-t16 font-medium ${HOVER_BLUE} cursor-pointer`}
        onClick={() => setIsFollowingModalOpen(true)}>
        {userInfo?.follow ?? 0} 팔로잉
      </div>
      {/*</Link>*/}
    </Container>
  )
}

const Container = styled.div`
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
