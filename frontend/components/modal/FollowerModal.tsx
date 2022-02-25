import React from 'react'

import { useAtom } from 'jotai'

import { isFollowerModalOpenAtom } from '@/atom/user/follow'
import FollowModal from '@/components/modal/FollowModal'
import { useFollowers } from '@/hook/react-query/useFollowers'

type Props = {
  userId: number
}

const FollowerModal: React.FC<Props> = ({ userId }) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useAtom(isFollowerModalOpenAtom)
  const { isLoading, followers, nickname } = useFollowers(userId)

  return (
    <FollowModal
      nickname={nickname}
      followers={followers}
      isFollowing={false}
      isModalOpen={isFollowerModalOpen}
      setModalOpen={setIsFollowerModalOpen}
      isLoading={isLoading}
    />
  )
}

export default FollowerModal
