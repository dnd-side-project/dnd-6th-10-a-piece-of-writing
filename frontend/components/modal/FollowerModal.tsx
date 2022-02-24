import React from 'react'

import { useAtom } from 'jotai'

import { isFollowerModalOpenAtom } from '@/atom/user/follow'
import { DUMMY_USERS } from '@/components/_user/type'
import FollowModal from '@/components/modal/FollowModal'

type Props = {}

const FollowerModal: React.FC<Props> = ({}) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useAtom(isFollowerModalOpenAtom)

  return (
    <FollowModal
      followers={DUMMY_USERS}
      isModalOpen={isFollowerModalOpen}
      setModalOpen={setIsFollowerModalOpen}
      isFollowing={false}
    />
  )
}

export default FollowerModal
