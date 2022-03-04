import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { Oval } from 'react-loader-spinner'

import { ProfileTab, userProfileTabAtom } from '@/atom/user'
import NoResult from '@/components/NoResult'
import Posts from '@/components/post/Posts'
import { useIsMe } from '@/hook/isMy/useIsMe'
import { useMyLikedPosts } from '@/hook/react-query/post/useMyLikedPosts'
import { useMyPosts } from '@/hook/react-query/post/useMyPosts'
import { GRAY } from '@/styles/classNames'
import { UserInfo } from '@/type/user'

type Props = {
  userInfo: UserInfo
}

// TODO : 유저 별 게시글 조회 나오면 수정 필요
const UserPosts: React.FC<Props> = ({ userInfo }) => {
  const isMe = useIsMe(userInfo?.id)
  const userProfileTab = useAtomValue(userProfileTabAtom)
  const isPostTab = userProfileTab === ProfileTab.POST
  // const isLikeTab = userProfileTab === ProfileTab.LIKE

  const { myPosts, isLoading: myPostsLoading } = useMyPosts()
  const { myLikedPosts, isLoading: myLikedPostsLoading } = useMyLikedPosts()

  const targetPosts = isPostTab ? myPosts : myLikedPosts

  if (myPostsLoading || myLikedPostsLoading)
    return (
      <div className={'w-full'}>
        <Oval height={140} color={GRAY} />
      </div>
    )

  return (
    <div className={'w-full'}>
      <NoResult isMyPage={isMe} isOtherUserPage={!isMe} />
      <Posts posts={targetPosts} />
    </div>
  )
}

export default UserPosts
