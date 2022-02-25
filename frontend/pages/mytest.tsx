import React from 'react'

import { useUpdateAtom } from 'jotai/utils'

import { isFollowerModalOpenAtom, isFollowingModalOpenAtom } from '@/atom/user/follow'
import FollowerModal from '@/components/modal/FollowerModal'
import FollowingModal from '@/components/modal/FollowingModal'

type Props = {}

const Test: React.FC<Props> = ({}) => {
  const setIsFollowerModalOpen = useUpdateAtom(isFollowerModalOpenAtom)
  const setIsFollowingModalOpen = useUpdateAtom(isFollowingModalOpenAtom)

  return (
    <>
      <button onClick={() => setIsFollowerModalOpen(true)}>팔로우</button>
      <button onClick={() => setIsFollowingModalOpen(true)}>팔로잉</button>
      <FollowerModal userId={3} />
      <FollowingModal userId={3} />
    </>
  )
}

export default Test
