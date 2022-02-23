import React from 'react'

import { GetServerSidePropsContext } from 'next'
import styled from 'styled-components'

import MainTitle from '@/components/_main/MainTitle'
import { UserInfo as UserInfoType } from '@/components/_user/type'
import AddButton from '@/components/button/AddButton'
import { TopicCarousel } from '@/components/carousel'
import Posts from '@/components/post/Posts'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { useSsrMe } from '@/hook/useSsrMe'
import { loadMainPosts } from '@/server/post'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'

type ServerSideProps = { me: UserInfoType; posts: any }

const Feed: React.FC<ServerSideProps> = ({ me, posts }) => {
  useSsrMe(me)

  console.log(posts)
  return (
    <>
      <div className={`flex flex-col-reverse flex-end items-center w-full`}>
        <AddButton sticky={true} />
        <MainContainer>
          <MainTitle />
          <FlexDiv margin={'2.5rem 0 0 0 '}>
            <div className={'w-full'}>
              <TopicCarousel topics={DUMMY_TOPICS} onClickTopic={(_) => () => {}} />
            </div>
          </FlexDiv>
          <div className={`w-full ${CENTER_FLEX} mt-10 ml-5 xl:ml-0`}>
            <Posts />
          </div>
        </MainContainer>
      </div>
    </>
  )
}

const MainContainer = styled.div`
  max-width: 1201px;
  margin-left: 1.3rem;
  margin-top: 1.3rem;
  width: 100%;
  @media screen and (min-width: 1201px) {
    margin-left: 0;
    width: auto;
  }
`

const DUMMY_TOPICS = [
  {
    name: '동기부여',
    isChecked: false,
  },
  {
    name: '공부',
    isChecked: false,
  },
  {
    name: '인생',
    isChecked: true,
  },
  {
    name: '감성',
    isChecked: true,
  },
  {
    name: '위로',
    isChecked: false,
  },
  {
    name: '월요일',
    isChecked: false,
  },
]

export const getServerSideProps = withAuthServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const res = await loadMainPosts({ page: 1, size: 20 })
  return {
    posts: res.data ?? [],
  }
})

export default Feed
