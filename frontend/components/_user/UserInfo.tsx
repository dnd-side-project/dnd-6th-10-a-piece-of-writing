import React from 'react'

import CheckButton, { CheckButtonColor } from '@/components/button/CheckButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import UserSummaryCard from '@/components/card/UserSummaryCard'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  nickname?: string
  followed?: boolean
}

const UserInfo: React.FC<Props> = ({ nickname = '유저 닉네임', followed }) => {
  return (
    <div className={`w-full ${CENTER_FLEX} flex-col`}>
      <ProfileImageCard editable={true} />
      <div className={'relative my-4 mb-5 w-64 text-center align-middle'}>
        <span className={'text-t16 font-semibold text-center'}>{nickname}</span>
        <div
          className={
            'flex absolute text-t16 right-0 p-1 px-2 translate-y-2/4 bottom-1/2 hover:bg-amber-200 cursor-pointer rounded-md'
          }>
          <button className={'text-amber-500 mr-1'}>{followed ? '팔로잉' : '팔로우'}</button>
          {followed && <CheckButton width={14} height={14} noContainer color={CheckButtonColor.ORANGE} />}
        </div>
      </div>
      <UserSummaryCard />
    </div>
  )
}

export default UserInfo
