import React from 'react'

import { UserInfo } from '@/components/_user/type'
import FollowButton from '@/components/button/FollowButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'

type Props = {
  userInfo: UserInfo
}

const FollowerCard: React.FC<Props> = ({ userInfo }) => {
  return (
    <div className={'flex items-center'}>
      <ProfileImageCard imgSrc={userInfo?.image} nickname={userInfo.nickname} editable={false} />
      <p className={'text-h4 ml-5 mr-1'}>{userInfo.nickname}</p>
      <FollowButton followed={userInfo.followed} />
    </div>
  )
}

export default FollowerCard
