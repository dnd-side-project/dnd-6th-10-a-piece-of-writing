import React, { useEffect } from 'react'

import { useAtom } from 'jotai'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { userInfoAtom } from '@/atom/user/me'
import { UserInfo as UserInfoType } from '@/components/_user/type'
import UserInfo from '@/components/_user/UserInfo'
import UserPostLabel from '@/components/_user/UserPostLabel'
import UserPosts from '@/components/_user/UserPosts'
import UserTopicCarousel from '@/components/_user/UserTopicCarousel'
import FollowerModal from '@/components/modal/FollowerModal'
import FollowingModal from '@/components/modal/FollowingModal'
import { useSsrMe } from '@/hook/useSsrMe'
import { loadProfile } from '@/server/user/profile'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'

type ServerSideProps = { me: UserInfoType; ssrUserInfo: UserInfoType }

const User: React.FC<ServerSideProps> = ({ me, ssrUserInfo }) => {
  useSsrMe(me, ssrUserInfo ?? [])
  const router = useRouter()
  const { id } = router.query
  const isMe = me?.id === Number(id)

  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  console.log({ userInfo })
  useEffect(() => {
    if (userInfo?.id || typeof id !== 'string') return
    void loadProfile(parseInt(id)).then((res) => {
      if (res.success) {
        setUserInfo(res.data)
        return
      }
      alert('잘못된 유저입니다.')
      router.back()
    })
  }, [userInfo])

  return (
    <>
      <div className={'flex flex-col align-middle justify-center items-center w-full'}>
        <FollowerModal />
        <FollowingModal />
        <Container>
          <UserInfo isMe={true} nickname={me?.nickname} userInfo={userInfo ?? null} />
          <UserPostLabel isMe={isMe} />
          <UserTopicCarousel />
          <UserPosts isMe={isMe} />
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
    const res = await loadProfile(parseInt(userIdByString))
    return {
      ssrUserInfo: res.data || null,
    }
  }
  return {}
})

export default User
