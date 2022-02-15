import React from 'react'

import styled from 'styled-components'

type Props = {
  width?: string
  value?: string
  onChange?: () => {}
}

const CommentInput: React.FC<Props> = ({ width = '100%', value, onChange, ...props }) => {
  return (
    <InputContainer
      width={width}
      value={value}
      onChange={onChange}
      placeholder={'나의 생각을 나눌 수 있습니다.'}
      {...props}
    />
  )
}

const InputContainer = styled.input`
  width: ${(props) => props.width ?? '100%'};
  height: 52px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
`

export default CommentInput
