import React from 'react'

import { useAtom } from 'jotai'

import { isFollowingModalOpenAtom } from '@/atom/user/follow'
import { DUMMY_USERS } from '@/components/_user/type'
import FollowModal from '@/components/modal/FollowModal'

type Props = {}

const FollowingModal: React.FC<Props> = ({}) => {
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useAtom(isFollowingModalOpenAtom)

  return (
    <FollowModal
      followers={DUMMY_USERS}
      isModalOpen={isFollowingModalOpen}
      setModalOpen={setIsFollowingModalOpen}
      isFollowing
    />
  )
}

export default FollowingModal
