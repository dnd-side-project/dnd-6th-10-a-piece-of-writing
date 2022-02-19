import React from 'react'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import styled from 'styled-components'

import { addTagUpdateAtom, tagSearchResultsAtom, tagSearchTextAtom } from '@/atom/tag'
import { addTag as addTagServer, TagInfo } from '@/server/tag'
import { HOVER_BLUE } from '@/styles/classNames'

type Props = {}

const TagSearchModal: React.FC<Props> = ({}) => {
  const text = useAtomValue(tagSearchTextAtom)
  const tagSearchResults = useAtomValue(tagSearchResultsAtom)
  const addTag = useUpdateAtom(addTagUpdateAtom)

  const tagSearchExist = tagSearchResults?.length !== 0

  const onClickAddTag = async (tagName: string) => {
    const res = await addTagServer(tagName)
    if (res.success) {
      if (res.data) addTag(res.data)
    }
  }

  const onClickSelectTag = (tag: TagInfo) => {
    if (tag) addTag(tag)
  }

  if (!tagSearchExist && !text) return null

  return (
    <Container>
      {tagSearchExist ? (
        tagSearchResults.map((tagSearchResult) => (
          <div
            className={`cursor-pointer w-full p-4 text-link ${HOVER_BLUE}`}
            key={`tagSearchResult_${tagSearchResult.id}`}
            onClick={() => onClickSelectTag(tagSearchResult)}>
            <p className={'text-ellipsis overflow-hidden whitespace-nowrap'}>{tagSearchResult.name}</p>
          </div>
        ))
      ) : (
        <div className={`cursor-pointer w-full p-4 text-link ${HOVER_BLUE}`} onClick={() => onClickAddTag(text)}>
          {`"${text}" 을 추가합니다.`}
        </div>
      )}
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
