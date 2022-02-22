import React, { useRef } from 'react'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { useEffectOnce } from 'react-use'
import styled from 'styled-components'

import { didSearchAtom, searchBarModalOpenAtom, searchResultAtom } from '@/atom/search'
import RecommendTopic from '@/components/_search/RecommendTopic'
import SearchBar from '@/components/_search/SearchBar'
import SearchBarModal from '@/components/_search/SearchBarModal'
import SearchResult from '@/components/_search/SearchResult'
import AddButton from '@/components/button/AddButton'
import NoResult from '@/components/NoResult'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { useClickOutside } from '@/hook/useClickOutside'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const Search: React.FC<Props> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useAtom(searchBarModalOpenAtom)
  const [searchResult, setSearchResult] = useAtom(searchResultAtom)
  const didSearch = useAtomValue(didSearchAtom)
  const searchResultExist = searchResult && searchResult?.length > 0

  const modalRef = useRef<HTMLDivElement>(null)

  useEffectOnce(() => {
    // setSearchResult(null)
    setSearchResult(['123'])
  })

  useClickOutside({
    ref: modalRef,
    func: () => {
      setIsModalOpen(false)
    },
  })

  return (
    <div className={`${CENTER_FLEX} px-4 relative`}>
      <Container className={`relative ${didSearch ? 'pt-8' : 'pt-28'} transition-all duration-1000 ease-in-out`}>
        <FlexDiv>
          <SearchBar />
        </FlexDiv>
        {isModalOpen && (
          <div ref={modalRef} className={'absolute top-44'}>
            <SearchBarModal />
          </div>
        )}
        {searchResultExist ? (
          <SearchResult />
        ) : didSearch ? (
          <div className={`${CENTER_FLEX} w-full mt-40`}>
            <NoResult isOtherUserPage={false} isMyPage={false} />
          </div>
        ) : (
          <div className={'mt-48'}>
            <RecommendTopic />
          </div>
        )}
      </Container>
      <div className={'sticky right-4 bottom-4 self-end'}>
        <AddButton />
      </div>
    </div>
  )
}

export const Container = styled.div`
  //min-height: 80vh;
  width: 100%;
  max-width: 1200px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`

export default Search
