import React from 'react'

import Posts from '@/components/post/Posts'

type Props = {}

const UserPosts: React.FC<Props> = ({}) => {
  return (
    <div className={'w-full'}>
      <Posts />
    </div>
  )
}

export default UserPosts
