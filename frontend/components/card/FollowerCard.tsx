import React from 'react'

import FollowButton from '@/components/button/FollowButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import { HOVER_BLUE } from '@/styles/classNames'
import { UserInfo } from '@/type/user'

type Props = {
  userInfo: UserInfo
  isSmall?: boolean
}

const FollowerCard: React.FC<Props> = ({ userInfo, isSmall }) => {
  if (!userInfo) return null
  return (
    <div className={'flex items-center'}>
      <div className={`flex items-center cursor-pointer ${HOVER_BLUE}`}>
        {isSmall ? (
          <>
            <ProfileImageCard
              imgSrc={userInfo?.profileUrl}
              nickname={userInfo.nickname}
              editable={false}
              width={'48px'}
            />
            <p className={'text-t16 ml-4 mr-1 text-ellipsis overflow-hidden whitespace-nowrap'}>{userInfo.nickname}</p>
          </>
        ) : (
          <>
            <ProfileImageCard imgSrc={userInfo?.profileUrl} nickname={userInfo.nickname} editable={false} />
            <p className={'text-h4 ml-5 mr-1 text-ellipsis overflow-hidden whitespace-nowrap'}>{userInfo.nickname}</p>
          </>
        )}
      </div>
      <FollowButton userId={userInfo?.id} followed={userInfo.alreadyFollow} />
    </div>
  )
}

export default FollowerCard
