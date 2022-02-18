import React from 'react'

import ProfileImageCard from '@/components/card/ProfileImageCard'
import UserSummaryCard from '@/components/card/UserSummaryCard'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  nickname?: string
}

const UserInfo: React.FC<Props> = ({ nickname = '유저 닉네임' }) => {
  return (
    <div className={`w-full ${CENTER_FLEX} flex-col`}>
      <ProfileImageCard editable={true} />
      <span className={'text-t16 font-semibold text-center my-4 mb-5'}>{nickname}</span>
      <UserSummaryCard />
    </div>
  )
}

export default UserInfo
