import React from 'react'

import NoResult from '@/components/NoResult'

type Props = {
  isMe?: boolean
}

const UserPosts: React.FC<Props> = ({ isMe = false }) => {
  return (
    <div className={'w-full'}>
      <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />
      {/*<Posts />*/}
    </div>
  )
}

export default UserPosts
