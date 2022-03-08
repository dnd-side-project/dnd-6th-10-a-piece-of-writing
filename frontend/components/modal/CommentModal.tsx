import React from 'react'

import styled from 'styled-components'

import { deleteReply } from '@/server/reply'
import { HOVER_BLUE } from '@/styles/classNames'

type Props = {
  id: number
}

const CommentModal: React.FC<Props> = ({ id }) => {
  const onClickModify = () => {
    // modifyReply()
  }

  const onClickDelete = () => {
    deleteReply(id).then((res) => {
      alert(res.message)
    })
  }

  return (
    <Container>
      <span className={`text-t14 p-2 pl-6 ${HOVER_BLUE} w-full cursor-pointer`} onClick={onClickModify}>
        수정하기
      </span>
      <span className={`text-t14 p-2 pl-6 ${HOVER_BLUE} w-full cursor-pointer`} onClick={onClickDelete}>
        삭제하기
      </span>
    </Container>
  )
}

const Container = styled.div`
  width: 226px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 13px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
`

export default CommentModal
