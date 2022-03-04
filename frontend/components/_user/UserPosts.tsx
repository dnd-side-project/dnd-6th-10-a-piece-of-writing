import React from 'react'

import NoResult from '@/components/NoResult'
import Posts from '@/components/post/Posts'
import { useIsMe } from '@/hook/isMy/useIsMe'
import { useMyPosts } from '@/hook/react-query/useMyPosts'
import { UserInfo } from '@/type/user'

type Props = {
  userInfo: UserInfo
}

const UserPosts: React.FC<Props> = ({ userInfo }) => {
  const { myPosts } = useMyPosts()
  const isMe = useIsMe(userInfo?.id)

  return (
    <div className={'w-full'}>
      <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />
      <Posts posts={myPosts} />
    </div>
  )
}

export default UserPosts
