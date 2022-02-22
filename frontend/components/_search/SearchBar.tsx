import React from 'react'

import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import Image from 'next/image'
import styled from 'styled-components'

import { searchBarModalOpenAtom, searchResultAtom, searchTextAtom, searchTypeTextAtom } from '@/atom/search'

type Props = {}

const SearchBar: React.FC<Props> = ({}) => {
  const [searchText, setSearchText] = useAtom(searchTextAtom)
  const searchType = useAtomValue(searchTypeTextAtom)
  const setOpen = useUpdateAtom(searchBarModalOpenAtom)
  const setSearchResult = useUpdateAtom(searchResultAtom)

  const doSearch = () => {
    if (!searchText) {
      alert('검색어를 입력해 주세요.')
      return
    }
    setSearchResult([])
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onKeyUpInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      doSearch()
    }
    e.preventDefault()
  }

  return (
    <SearchBarContainer>
      <span className={'w-10 sm:w-14 text-t12 sm:text-t14 cursor-pointer'} onClick={() => setOpen(true)}>
        {searchType}
      </span>
      <div className={'ml-2 mr-4 cursor-pointer'} onClick={() => setOpen(true)}>
        <Image src={'/down.svg'} width={20} height={20} />
      </div>
      <input
        className={'text-t12 sm:text-t14 w-3/5'}
        value={searchText}
        onChange={onChangeInput}
        onKeyUp={onKeyUpInput}
        placeholder={'오늘은 어떤 글을 찾아볼까요?'}
      />
      <div className={'ml-auto cursor-pointer'} onClick={() => doSearch()}>
        <Image src={'/menu_search.svg'} width={20} height={20} />
      </div>
    </SearchBarContainer>
  )
}

const SearchBarContainer = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
`

export default SearchBar
