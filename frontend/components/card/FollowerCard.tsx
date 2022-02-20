import React from 'react'

import { UserInfo } from '@/components/_user/type'
import FollowButton from '@/components/button/FollowButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import { HOVER_BLUE } from '@/styles/classNames'

type Props = {
  userInfo: UserInfo
}

const FollowerCard: React.FC<Props> = ({ userInfo }) => {
  return (
    <div className={'flex items-center'}>
      <div className={`flex items-center cursor-pointer ${HOVER_BLUE}`}>
        <ProfileImageCard imgSrc={userInfo?.profileUrl} nickname={userInfo.nickname} editable={false} />
        <p className={'text-h4 ml-5 mr-1'}>{userInfo.nickname}</p>
      </div>
      <FollowButton followed={userInfo.followed} />
    </div>
  )
}

export default FollowerCard
