import React, { useEffect, useState } from 'react'

import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import Image from 'next/image'
import { useDebounce } from 'react-use'
import styled from 'styled-components'

import { topicSearchResultsAtom, topicSearchTextAtom } from '@/atom/topic'
import { searchTopic } from '@/server/topic'

type Props = {}

const TopicSearchBar: React.FC<Props> = ({}) => {
  const [text, setText] = useAtom(topicSearchTextAtom)
  const [textForApi, setTextForApi] = useState('')

  const setTopicSearchResults = useUpdateAtom(topicSearchResultsAtom)

  console.log({ textForApi })

  const [,] = useDebounce(
    () => {
      setTextForApi(text)
    },
    500,
    [text],
  )

  useEffect(() => {
    if (textForApi === '') return
    const setTopics = async () => {
      const res = await searchTopic(textForApi)
      if (res.data) setTopicSearchResults(res.data)
    }
    setTopics()
  }, [textForApi])

  return (
    <Container>
      <input placeholder={'키워드로 검색'} value={text} onChange={(e) => setText(e.target.value)} />
      <div className={'ml-auto'}>
        <Image src={'/menu_search.svg'} width={24} height={24} alt={'search'} />
      </div>
    </Container>
  )
}

type ContainerProps = {
  width?: string
  height?: string
}

const Container = styled.div`
  // width: ${(props: ContainerProps) => props.width ?? '386px'};
  height: ${(props: ContainerProps) => props.height ?? '44px'};
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 30px;
  border: solid 1px #a1a1a1;
  //color: #b9b9b9;
  font-size: 14px;
`

export default TopicSearchBar
