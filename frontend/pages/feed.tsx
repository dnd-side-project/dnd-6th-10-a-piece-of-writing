import React from 'react'

import { Rings } from 'react-loader-spinner'
import styled from 'styled-components'

import MainTitle from '@/components/_main/MainTitle'
import AddButton from '@/components/button/AddButton'
import { TopicCarousel } from '@/components/carousel'
import Posts, { DUMMY_POSTS } from '@/components/post/Posts'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { useMainTopics } from '@/hook/react-query/topic/useMainTopics'
import { useSsrMe } from '@/hook/useSsrMe'
import { loadMainPosts } from '@/server/post'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType; posts: any }

const Feed: React.FC<ServerSideProps> = ({ me, posts }) => {
  useSsrMe(me)

  const { topics, isLoading: topicLoading } = useMainTopics()
  console.log(posts)
  return (
    <>
      <div className={`flex flex-col-reverse flex-end items-center w-full`}>
        <AddButton sticky={true} />
        <MainContainer>
          <MainTitle />
          <FlexDiv margin={'2.5rem 0 0 0 '}>
            <div className={'w-full'}>
              {topicLoading ? (
                <Rings height={40} />
              ) : (
                <TopicCarousel topics={topics.length === 0 ? [] : topics} onClickTopic={(_) => () => {}} />
              )}
            </div>
          </FlexDiv>
          <div className={`w-full ${CENTER_FLEX} mt-10 ml-5 xl:ml-0`}>
            {/*<InfiniteScroll*/}
            {/*  dataLength={items.length} //This is important field to render the next data*/}
            {/*  next={fetchData}*/}
            {/*  hasMore={true}*/}
            {/*  loader={<h4>Loading...</h4>}*/}
            {/*  endMessage={*/}
            {/*    <p style={{ textAlign: 'center' }}>*/}
            {/*      <b>Yay! You have seen it all</b>*/}
            {/*    </p>*/}
            {/*  }*/}
            {/*  // below props only if you need pull down functionality*/}
            {/*  refreshFunction={this.refresh}*/}
            {/*  pullDownToRefresh*/}
            {/*  pullDownToRefreshThreshold={50}*/}
            {/*  pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}*/}
            {/*  releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}>*/}
            {/*  {items}*/}
            <Posts posts={DUMMY_POSTS} />
            {/*</InfiniteScroll>*/}
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

export const getServerSideProps = withAuthServerSideProps(async () => {
  const res = await loadMainPosts({ page: 1, size: 10 })
  console.log({ res })
  return {
    posts: res.data ?? [],
  }
})

export default Feed
