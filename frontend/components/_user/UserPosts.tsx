import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { ProfileTab, userProfileTabAtom } from '@/atom/user'
import NoResult from '@/components/NoResult'
import Posts from '@/components/post/Posts'
import { useIsMe } from '@/hook/isMy/useIsMe'
import { PostInfo } from '@/type/post'
import { UserInfo } from '@/type/user'

type Props = {
  userInfo: UserInfo
  userPosts: PostInfo[]
  likePosts: PostInfo[]
}

// TODO : 유저 별 게시글 조회 나오면 수정 필요
const UserPosts: React.FC<Props> = ({ userInfo, userPosts, likePosts }) => {
  const isMe = useIsMe(userInfo?.id)
  const userProfileTab = useAtomValue(userProfileTabAtom)
  const isPostTab = userProfileTab === ProfileTab.POST
  const isLikeTab = userProfileTab === ProfileTab.LIKE

  //
  // if (myPostsLoading || myLikedPostsLoading)
  //   return (
  //     <div className={'w-full'}>
  //       <Oval height={140} color={GRAY} />
  //     </div>
  //   )

  return (
    <div className={'w-full'}>
      {isPostTab && (userPosts ? <Posts posts={userPosts} /> : <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />)}
      {isLikeTab && (likePosts ? <Posts posts={likePosts} /> : <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />)}
    </div>
  )
}

export default UserPosts
