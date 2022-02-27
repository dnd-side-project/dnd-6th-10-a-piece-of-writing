import React from 'react'

import FollowerCard from '@/components/card/FollowerCard'
import { UserInfo } from '@/type/user'

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
