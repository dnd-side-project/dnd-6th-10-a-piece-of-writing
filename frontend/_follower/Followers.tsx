import React from 'react'

import { UserInfo } from '@/components/_user/type'
import FollowerCard from '@/components/card/FollowerCard'

type Props = {
  followers: UserInfo[]
}

const Followers: React.FC<Props> = ({ followers }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      {followers.map((follower) => (
        <FollowerCard key={`FollowerCard_${follower.id}`} userInfo={follower} />
      ))}
    </div>
  )
}

export default Followers