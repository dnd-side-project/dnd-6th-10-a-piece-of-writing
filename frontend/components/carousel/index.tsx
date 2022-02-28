import React from 'react'

import { useAtom } from 'jotai'
import Slider, { Settings } from 'react-slick'
import styled from 'styled-components'

import { isTopicSearchBarOpenAtom } from '@/atom/topic'
import CheckButton, { CheckButtonColor } from '@/components/button/CheckButton'
import TopicSearch from '@/components/input/TopicSearch'
import { FlexDiv } from '@/components/style/div/FlexDiv'

const sliderSettings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  arrows: true,
  variableWidth: true,
}

type TopicInfoType = { name: string; isChecked?: boolean }
type TopicCarouselProps = TopicInfoType[]
type Props = {
  topics: TopicCarouselProps
  onClickTopic?: (index: number) => () => void
  showAll?: boolean
  onClickAll?: () => void
}

export const TopicCarousel = ({ topics, onClickTopic, showAll, onClickAll = () => {} }: Props) => {
  const [isTopicSearchBarOpen, setIsTopicSearchBarOpen] = useAtom(isTopicSearchBarOpenAtom)

  return (
    <Slider {...sliderSettings}>
      {showAll && <Topic topicInfo={{ name: '모두', isChecked: true }} onClick={onClickAll} />}
      {topics.map((topicInfo, i) => (
        <Topic key={`TopicContainer_${i}`} topicInfo={topicInfo} onClick={onClickTopic ? onClickTopic(i) : () => {}} />
      ))}
      {isTopicSearchBarOpen ? (
        <TopicSearch />
      ) : (
        <AddTopicButton onClick={() => setIsTopicSearchBarOpen(true)}>
          <FlexDiv height={'100%'}>+</FlexDiv>
        </AddTopicButton>
      )}
    </Slider>
  )
}

export const Topic = ({ topicInfo, onClick }: { topicInfo: TopicInfoType; onClick: () => void }) => {
  return (
    <TopicContainer onClick={onClick} isChecked={topicInfo.isChecked}>
      <TopicSpan>{topicInfo.name}</TopicSpan>
      {topicInfo.isChecked && <CheckButton noContainer width={20} height={20} color={CheckButtonColor.WHITE} />}
    </TopicContainer>
  )
}

type TopicContainerProps = {
  isChecked?: boolean
}

const TopicContainer = styled.div`
  height: 44px;
  margin-right: 8px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 30px;
  border: solid 1px #a1a1a1;
  cursor: pointer;
  color: ${(props: TopicContainerProps) => (props.isChecked ? 'white' : '#2c2c2c')};
  background-color: ${(props: TopicContainerProps) => props.isChecked && '#444444'};
`

const TopicSpan = styled.div`
  flex-grow: 0;
  font-size: 14px;
  text-align: center;
`

const AddTopicButton = styled.div`
  width: 44px !important;
  height: 44px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  border: solid 1px #a1a1a1;
  cursor: pointer;
`
