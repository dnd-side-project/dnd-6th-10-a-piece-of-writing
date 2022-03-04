import React from 'react'

import { useRouter } from 'next/router'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

import PostCard from '@/components/card/PostCard'
import { usePostTopics } from '@/hook/react-query/topic/usePostTopic'
import { usePost } from '@/hook/react-query/usePost'
import { useSsrMe } from '@/hook/useSsrMe'
import { GRAY } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType; ssrUserInfo: UserInfoType }

const User: React.FC<ServerSideProps> = ({ me, ssrUserInfo }) => {
  useSsrMe(me, ssrUserInfo ?? [])
  const router = useRouter()
  const { id } = router.query
  const postId = typeof id === 'string' ? parseInt(id) : 2

  const { post, isLoading: postLoading } = usePost(postId)
  const { topics } = usePostTopics(postId)

  return (
    <>
      <Container>
        <div className={'flex flex-col align-middle justify-center items-center w-full h-full'}>
          {postLoading ? (
            <div className={'flex mt-10'}>
              <Oval color={GRAY} />
            </div>
          ) : (
            <div className={'flex mt-2 border-1 border-solid border-gray-200 py-3 px-2 rounded'}>
              <PostCard post={post} topics={topics} />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  @media screen and (min-width: 1201px) {
    width: 1201px;
    margin-left: 0;
    //width: auto;
  }
`

export default User
