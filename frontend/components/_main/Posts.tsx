import React from 'react'

import styled from 'styled-components'

import Post from '@/components/_main/Post'

type Props = {}

const Posts: React.FC<Props> = ({}) => {
  return (
    <PostsContainer>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </PostsContainer>
  )
}

export default Posts

const PostsContainer = styled.div`
  display: flex;
  max-width: 1201px;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  margin-left: 1.3rem;
  @media screen and (min-width: 1201px) {
    margin-left: 0;
  }
`
