import React, { useState } from 'react'

import { useAtomValue } from 'jotai/utils'
import styled from 'styled-components'

import { meAtom } from '@/atom/user/me'
import { MAX_COMMENT_LENGTH } from '@/constant/number'
import { addReply } from '@/server/reply'

type Props = {
  postId: number
  width?: string
}

const CommentInput: React.FC<Props> = ({ postId, width = '100%', ...props }) => {
  const me = useAtomValue(meAtom)
  const [text, setText] = useState('')

  const onChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length <= MAX_COMMENT_LENGTH) setText(e.target.value)
  }

  if (!postId) return null

  const onClickAddComment = () => {
    if (!text) return alert('댓글을 입력하세요!')
    if (!me?.id) return alert('로그인이 필요합니다!')
    addReply({ postsId: postId, text }).then((res) => {
      alert(res.message)
    })
  }

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') onClickAddComment()
  }

  return (
    <InputContainer width={width} {...props}>
      <input
        className={'w-3/4 text-t12 sm:text-t14'}
        value={text}
        onChange={onChangeText}
        onKeyPress={onKeyPress}
        placeholder={'나의 생각을 나눌 수 있습니다.'}
        disabled={!me?.id}
      />
      <p className={'cursor-pointer ml-auto text-t12 sm:text-t14'} onClick={onClickAddComment}>
        올리기
      </p>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  width: ${(props: { width?: string }) => props.width ?? '100%'};
  height: 52px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
`

export default CommentInput
