import React from 'react'

import { useUpdateAtom } from 'jotai/utils'
import styled from 'styled-components'

import { SearchType, searchTypeAtom } from '@/atom/search'
import { HOVER_BLUE } from '@/styles/classNames'

type Props = {}

const SearchBarModal: React.FC<Props> = ({}) => {
  const setSearchType = useUpdateAtom(searchTypeAtom)

  const onClickTab = (type: SearchType) => () => {
    setSearchType(type)
  }
  return (
    <Container>
      <div className={`px-4 py-2 ${HOVER_BLUE} cursor-pointer`} onClick={onClickTab(SearchType.CONTENT)}>
        글 내용
      </div>
      <div className={`px-4 py-2 ${HOVER_BLUE} cursor-pointer`} onClick={onClickTab(SearchType.TOPIC)}>
        토픽
      </div>
      <div className={`px-4 py-2 ${HOVER_BLUE} cursor-pointer`} onClick={onClickTab(SearchType.NICKNAME)}>
        글쓴이
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 226px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
  border-radius: 13px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
`

export default SearchBarModal
