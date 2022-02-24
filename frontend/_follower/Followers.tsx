import React from 'react'

import { UserInfo } from '@/components/_user/type'
import FollowerCard from '@/components/card/FollowerCard'

type Props = {
  followers: UserInfo[]
  isSmall?: boolean
}

const Followers: React.FC<Props> = ({ followers, isSmall = false }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      {followers.map((follower) =>
        follower ? <FollowerCard key={`FollowerCard_${follower.id}`} userInfo={follower} isSmall={isSmall} /> : '',
      )}
    </div>
  )
}

export default Followers
