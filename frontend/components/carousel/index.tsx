import React from 'react'

import Slider, { Settings } from 'react-slick'
import styled from 'styled-components'

import CheckButton, { CheckButtonColor } from '@/components/button/CheckButton'
import { FlexDiv } from '@/components/style/div/FlexDiv'

const sliderSettings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  arrows: false,
  variableWidth: true,
}

type TagInfoType = { name: string; isChecked?: boolean }
type TagCarouselProps = TagInfoType[]
type Props = {
  tags: TagCarouselProps
  onClickTag?: (index: number) => () => void
  showAll?: boolean
  onClickAll?: () => void
}

export const TagCarousel = ({ tags, onClickTag, showAll, onClickAll = () => {} }: Props) => {
  return (
    <Slider {...sliderSettings}>
      {showAll && <Tag tagInfo={{ name: '모두', isChecked: true }} onClick={onClickAll} />}
      {tags.map((tagInfo, i) => (
        <Tag key={`TagContainer_${i}`} tagInfo={tagInfo} onClick={onClickTag ? onClickTag(i) : () => {}} />
      ))}
      <AddTagButton>
        <FlexDiv height={'100%'}>+</FlexDiv>
      </AddTagButton>
    </Slider>
  )
}

export const Tag = ({ tagInfo, onClick }: { tagInfo: TagInfoType; onClick: () => void }) => {
  return (
    <TagContainer onClick={onClick} isChecked={tagInfo.isChecked}>
      <TagSpan>{tagInfo.name}</TagSpan>
      {tagInfo.isChecked && <CheckButton noContainer width={20} height={20} color={CheckButtonColor.WHITE} />}
    </TagContainer>
  )
}

type TagContainerProps = {
  isChecked?: boolean
}

const TagContainer = styled.div`
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
  color: ${(props: TagContainerProps) => (props.isChecked ? 'white' : '#2c2c2c')};
  background-color: ${(props: TagContainerProps) => props.isChecked && '#444444'};
`

const TagSpan = styled.div`
  flex-grow: 0;
  font-size: 14px;
  text-align: center;
`

const AddTagButton = styled.div`
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
