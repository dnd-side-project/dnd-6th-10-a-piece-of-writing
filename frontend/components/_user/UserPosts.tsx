import React from 'react'

import NoResult from '@/components/NoResult'
import Posts from '@/components/post/Posts'
import { useMyPosts } from '@/hook/react-query/useMyPosts'

type Props = {
  isMe?: boolean
}

const UserPosts: React.FC<Props> = ({ isMe = false }) => {
  const { myPosts } = useMyPosts()
  console.log({ myPosts })
  return (
    <div className={'w-full'}>
      <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />
      <Posts posts={myPosts} />
    </div>
  )
}

export default UserPosts
