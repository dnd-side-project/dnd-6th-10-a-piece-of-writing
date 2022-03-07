import React from 'react'

import styled from 'styled-components'

import Post from '@/components/post/Post'
import { PostInfo } from '@/type/post'

export const DUMMY_POSTS: PostInfo[] = [
  {
    postsId: 1,
    content: '테스트',
    imageUrl: 'https://picsum.photos/id/10/400/400',
  },
  {
    postsId: 2,
    content: '테스트',
    imageUrl: 'https://picsum.photos/id/1019/400/400',
  },
  {
    postsId: 3,
    content: '테스트',
    imageUrl: 'https://picsum.photos/id/1022/400/400',
  },
  {
    postsId: 4,
    content: '테스트',
    imageUrl: 'https://picsum.photos/id/1002/400/400',
  },
  {
    postsId: 5,
    content: '테스트',
    imageUrl: 'https://picsum.photos/id/9/400/400',
  },
]

type Props = {
  posts?: PostInfo[]
}

const Posts: React.FC<Props> = ({ posts = DUMMY_POSTS }) => {
  if (!posts || !posts.length) return null

  return (
    <PostsContainer>
      {posts.map((post) => (
        <Post key={`Post_${post.postsId}`} post={post} />
      ))}
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
