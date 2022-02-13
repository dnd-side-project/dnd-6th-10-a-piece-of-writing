import React from 'react'

import PostCard from '@/components/card/PostCard'
import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = {}

const Test: React.FC<Props> = ({}) => {
  return (
    <FlexDiv>
      <PostCard imageUrl={'https://fakeimg.pl/100x100/'} />
    </FlexDiv>
  )
}

export default Test
