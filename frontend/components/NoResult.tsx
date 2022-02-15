import React from 'react'

import AddButton from '@/components/button/AddButton'
import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = {}

const NoResult: React.FC<Props> = ({}) => {
  return (
    <FlexDiv direction={'column'}>
      <div className={'whitespace-pre-line text-h3 text-center mb-8'}>
        {'결과가 없네요 \n 가장 먼저 글귀를 올려보는 건 어떨까요?'}
      </div>
      <AddButton />
    </FlexDiv>
  )
}

export default NoResult
