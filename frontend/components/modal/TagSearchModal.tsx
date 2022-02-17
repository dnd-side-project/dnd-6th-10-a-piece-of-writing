import React from 'react'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import styled from 'styled-components'

import { addTagUpdateAtom, tagSearchResultsAtom } from '@/atom/tag'
import { addTag as addTagServer } from '@/server/tag'

type Props = {}

const TagSearchModal: React.FC<Props> = ({}) => {
  const tagSearchResults = useAtomValue(tagSearchResultsAtom)
  const addTag = useUpdateAtom(addTagUpdateAtom)

  if (tagSearchResults?.length === 0) return null

  const onClickTag = async (tagName: string) => {
    const res = await addTagServer(tagName)
    if (res.success) {
      if (res.data) addTag(res.data)
    }
  }

  return (
    <Container>
      {tagSearchResults.map((tagSearchResult) => (
        <div
          className={'cursor-pointer w-full p-4 text-link hover:bg-blue-100'}
          key={`tagSearchResult_${tagSearchResult.id}`}
          onClick={() => {
            onClickTag(tagSearchResult.name)
          }}>
          <p className={'text-ellipsis overflow-hidden whitespace-nowrap'}>{tagSearchResult.name}</p>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 285px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
`

export default TagSearchModal
