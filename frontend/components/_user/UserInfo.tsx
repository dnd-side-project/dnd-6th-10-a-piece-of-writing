import React from 'react'

import FollowButton from '@/components/button/FollowButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import UserSummaryCard from '@/components/card/UserSummaryCard'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  nickname?: string
  followed?: boolean
}

const UserInfo: React.FC<Props> = ({ nickname = '유저 닉네임', followed }) => {
  return (
    <div className={`w-full ${CENTER_FLEX} flex-col mt-14`}>
      <ProfileImageCard editable={true} />
      <div className={'relative my-4 mb-5 w-64 text-center align-middle'}>
        <span className={'text-t16 font-semibold text-center'}>{nickname}</span>
        <div className={'absolute right-0 translate-y-2/4 bottom-1/2 '}>
          <FollowButton followed={followed} />
        </div>
      </div>
      <UserSummaryCard />
    </div>
  )
}

export default UserInfo
