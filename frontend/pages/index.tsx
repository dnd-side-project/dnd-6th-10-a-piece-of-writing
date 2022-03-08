import React from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval, Rings } from 'react-loader-spinner'
import styled from 'styled-components'

import MainTitle from '@/components/_main/MainTitle'
import AddButton from '@/components/button/AddButton'
import { TopicCarousel } from '@/components/carousel'
import Posts from '@/components/post/Posts'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { useMainInfinitePosts } from '@/hook/react-query/post/useMainInfinitePosts'
import { useMainTopics } from '@/hook/react-query/topic/useMainTopics'
import { useSsrMe } from '@/hook/useSsrMe'
import { loadMainPosts } from '@/server/post'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX, GRAY } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType; posts: any }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PAGE_SIZE = 10

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Feed: React.FC<ServerSideProps> = ({ me, posts }) => {
  useSsrMe(me)
  // const [page, setPage] = useState(1)
  const { topics, isLoading: topicLoading } = useMainTopics()
  const { data, fetchNextPage, hasNextPage } = useMainInfinitePosts()

  console.log(data?.pages)

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
            <InfiniteScroll
              dataLength={10} //This is important field to render the next data
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={
                <FlexDiv>
                  <Oval color={GRAY} height={150}></Oval>
                </FlexDiv>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              pullDownToRefresh
              refreshFunction={() => {}}
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
              releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}>
              <Posts posts={data?.pages?.map((page) => page.posts).reduce((prev, next) => [...prev, ...next])} />
            </InfiniteScroll>
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
  console.log({ ssrPosts: res })
  return {
    posts: res.data ?? [],
  }
})

export default Feed
