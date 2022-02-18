import React from 'react'

import ProfileImageCard from '@/components/card/ProfileImageCard'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const UserInfo: React.FC<Props> = ({}) => {
  return (
    <div className={`w-full ${CENTER_FLEX}`}>
      <ProfileImageCard editable={true} />
    </div>
  )
}

export default UserInfo
