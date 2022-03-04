import React from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import PostCard from '@/components/card/PostCard'
import { usePost } from '@/hook/react-query/usePost'
import { useSsrMe } from '@/hook/useSsrMe'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType; ssrUserInfo: UserInfoType }

const User: React.FC<ServerSideProps> = ({ me, ssrUserInfo }) => {
  useSsrMe(me, ssrUserInfo ?? [])
  const router = useRouter()
  const { id } = router.query
  const postId = typeof id === 'string' ? parseInt(id) : 2

  const { post, isLoading: postLoading } = usePost(postId)
  console.log({ post })

  return (
    <>
      <div className={'flex flex-col align-middle justify-center items-center w-full'}>
        <Container>
          <PostCard post={post} topics={[]} />
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

export default User
