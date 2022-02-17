import React from 'react'

import Image from 'next/image'
import Slider, { Settings } from 'react-slick'
import styled from 'styled-components'

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
}

export const TagCarousel = ({ tags, onClickTag }: Props) => {
  return (
    <Slider {...sliderSettings}>
      {tags.map((tagInfo, i) => (
        <Tag key={`TagContainer_${i}`} tagInfo={tagInfo} onClick={onClickTag ? onClickTag(i) : () => {}} />
      ))}
      <AddTagButton>
        <FlexDiv height={'100%'}>+</FlexDiv>
      </AddTagButton>
    </Slider>
  )
}

const Tag = ({ tagInfo, onClick }: { tagInfo: TagInfoType; onClick: () => void }) => {
  return (
    <TagContainer onClick={onClick} isChecked={tagInfo.isChecked}>
      <TagSpan>{tagInfo.name}</TagSpan>
      {tagInfo.isChecked && <Image src={'/post_check.svg'} width={20} height={20} />}
    </TagContainer>
  )
}

const TagContainer = styled.div`
  height: 44px;
  margin-right: 8px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 30px;
  border: solid 1px #a1a1a1;
  cursor: pointer;
  background-color: ${(props: { isChecked?: boolean }) => props.isChecked && '#F5F2E7'};
`

const TagSpan = styled.div`
  flex-grow: 0;
  font-size: 14px;
  text-align: center;
  color: #2c2c2c;
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
