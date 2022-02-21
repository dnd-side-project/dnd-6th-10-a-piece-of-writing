import React from 'react'

import AddButton from '@/components/button/AddButton'
import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = {
  isMyPage?: boolean
  isOtherUserPage?: boolean
}

const NoResult: React.FC<Props> = ({ isMyPage = false, isOtherUserPage = false }) => {
  return (
    <FlexDiv direction={'column'}>
      <div className={'whitespace-pre-line text-h3 text-center mb-8 text-gray-600'}>
        {isOtherUserPage
          ? '아직 아무 글도 없네요.'
          : isMyPage
          ? '아직 아무 글도 없네요. \n 나의 글조각을 업로드하면 어떨까요?'
          : '결과가 없네요. \n 가장 먼저 글귀를 올려보는 건 어떨까요?'}
      </div>
      <AddButton sticky={false} />
    </FlexDiv>
  )
}

export default NoResult
