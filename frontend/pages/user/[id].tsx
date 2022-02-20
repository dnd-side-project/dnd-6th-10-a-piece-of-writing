import React from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import UserTagCarousel from '@/components/_user/UesrTagCarousel'
import UserInfo from '@/components/_user/UserInfo'
import UserPostLabel from '@/components/_user/UserPostLabel'
import UserPosts from '@/components/_user/UserPosts'

type Props = {}

const User: React.FC<Props> = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const isMe = true
  console.log({ id })
  console.log(router.asPath)

  return (
    <>
      <div className={'flex flex-col align-middle justify-center items-center w-full'}>
        <Container>
          <UserInfo isMe={isMe} />
          <UserPostLabel isMe={isMe} />
          <UserTagCarousel />
          <UserPosts />
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
