import React from 'react'

import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import UserInfo from '@/components/_user/UserInfo'
import UserPostLabel from '@/components/_user/UserPostLabel'
import UserPosts from '@/components/_user/UserPosts'
import UserTopicCarousel from '@/components/_user/UserTopicCarousel'
import FollowerModal from '@/components/modal/FollowerModal'
import FollowingModal from '@/components/modal/FollowingModal'
import { useUserProfile } from '@/hook/react-query/useUserProfile'
import { useSsrMe } from '@/hook/useSsrMe'
import { loadUserPosts } from '@/server/post'
import { loadProfile } from '@/server/user/profile'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { PostInfo } from '@/type/post'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType; ssrUserInfo: UserInfoType; ssrPosts: PostInfo[] }

const User: React.FC<ServerSideProps> = ({ me, ssrPosts = [], ssrUserInfo }) => {
  useSsrMe(me)
  const router = useRouter()
  const { id } = router.query
  const userId = typeof id === 'string' ? parseInt(id) : 1

  const { userInfo: csrUserInfo } = useUserProfile(userId, !ssrUserInfo?.id)

  console.log({ ssrUserInfo })

  const userInfo = ssrUserInfo ?? csrUserInfo

  return (
    <>
      <div className={'flex flex-col align-middle justify-center items-center w-full'}>
        <FollowerModal userId={userId} />
        <FollowingModal userId={userId} />
        <Container>
          <UserInfo userInfo={userInfo} />
          <UserPostLabel userInfo={userInfo} />
          <UserTopicCarousel userInfo={userInfo} />
          <UserPosts userInfo={userInfo} likePosts={ssrPosts} userPosts={ssrPosts} />
        </Container>
      </div>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 1201px) {
    width: 1201px;
    margin-left: 0;
    //width: auto;
  }
`

export const getServerSideProps = withAuthServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const userIdByString = ctx.req.url?.slice(6) //  -- /user/123  의 index 6 이후값들
  if (userIdByString) {
    const profileResult = await loadProfile(parseInt(userIdByString))
    const postResult = await loadUserPosts(parseInt(userIdByString), ctx)
    return {
      ssrUserInfo: profileResult.data || null,
      ssrPosts: postResult.data ?? null,
    }
  }
  return {}
})

export default User
