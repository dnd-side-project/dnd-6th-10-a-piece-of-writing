import React from 'react'

import styled from 'styled-components'

import Post from '@/components/post/Post'

type Props = {}

const Posts: React.FC<Props> = ({}) => {
  return (
    <PostsContainer>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </PostsContainer>
  )
}

export default Posts

const PostsContainer = styled.div`
  display: flex;
  max-width: 1201px;
  gap: 20px;
  flex-wrap: wrap;
`
