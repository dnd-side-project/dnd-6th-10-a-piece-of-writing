import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { searchResultTypeAtom, SearchType } from '@/atom/search'
import ContentSearchResult from '@/components/_search/SearchResult/ContentSearchResult'
import NicknameSearchResult from '@/components/_search/SearchResult/NicknameSearchResult'
import TopicSearchResult from '@/components/_search/SearchResult/TopicSearchResult'

type Props = {}

const SearchResult: React.FC<Props> = ({}) => {
  const searchResultType = useAtomValue(searchResultTypeAtom)
  if (searchResultType === SearchType.CONTENT) return <ContentSearchResult />
  if (searchResultType === SearchType.TOPIC) return <TopicSearchResult />
  if (searchResultType === SearchType.NICKNAME) return <NicknameSearchResult />
  return <div className={'flex w-full text-center justify-center mt-32'}>오류가 발생했습니다.</div>
}

export default SearchResult
