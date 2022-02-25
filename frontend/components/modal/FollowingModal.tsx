import React from 'react'

import { useAtom } from 'jotai'

import { isFollowingModalOpenAtom } from '@/atom/user/follow'
import FollowModal from '@/components/modal/FollowModal'
import { useFollowings } from '@/hook/react-query/userFollowings'

type Props = {
  userId: number
}

const FollowingModal: React.FC<Props> = ({ userId }) => {
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useAtom(isFollowingModalOpenAtom)
  const { isLoading, followings, nickname } = useFollowings(userId)

  return (
    <FollowModal
      nickname={nickname}
      followers={followings}
      isModalOpen={isFollowingModalOpen}
      setModalOpen={setIsFollowingModalOpen}
      isLoading={isLoading}
      isFollowing
    />
  )
}

export default FollowingModal
