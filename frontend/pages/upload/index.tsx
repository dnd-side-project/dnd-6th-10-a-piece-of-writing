import React, { useState } from 'react'
import styled from 'styled-components'

import { CENTER_FLEX } from '@/styles/classNames'
import { Label } from '@/components/form/register/RegisterMainForm'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { PlainDivider } from '@/components/divider'
import { TagCarousel } from '@/components/carousel'
import { Button } from '@/components/button'
import ImageUploadModal from '@/components/modal/ImageUploadModal'

import 'rc-slider/assets/index.css'
import 'cropperjs/dist/cropper.css'
import { uesToggles } from '@/hook/useToggles'
import Image from 'next/image'
import ImageCarousel from '@/components/carousel/ImageCarousel'

type Props = {}

const FONTS = [
  { name: '노토산스', eng: 'Noto Sans KR' },
  { name: '나눔명조', eng: 'NanumMyeongjo' },
  { name: '나눔스퀘어', eng: 'NanumSquare' },
  { name: '교보손글씨', eng: 'KyoboHandwriting' },
]

const FONT_SIZES = [
  { name: '작은 글씨', size: '12px' },
  { name: '중간 글씨', size: '14px' },
  { name: '큰 글씨', size: '16px' },
  { name: '가장 큰 글씨', size: '20px' },
]

const upload: React.FC<Props> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [text, setText] = useState('흰 봉투에 눈을 한 줌 옇고\n' + '글씨도 쓰지 말고\n' + '우표도 부치지 말고')
  const [source, setSource] = useState('책 제목-작가 / 영화제목/ 노래 제목 - 가수')
  const [textColor, setTextColor] = useState('black')

  const {
    selectedIndex: fontIndex,
    isSelectedIndex: isSelectedFontIndex,
    onToggle: onClickFont,
  } = uesToggles({ defaultIndexes: [0] })
  const {
    selectedIndex: fontSizeIndex,
    isSelectedIndex: isSelectedFontSizeIndex,
    onToggle: onClickFontSize,
  } = uesToggles({ defaultIndexes: [1] })
  const {
    selectedIndexes: tagIndexes,
    isSelectedIndex: isSelectedTag,
    onToggle: onClickTag,
  } = uesToggles({ defaultIndexes: [0], singleMode: false })

  const onClickImageUploadButton = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen)
  }

  const selectedFontFamily = FONTS[fontIndex]?.eng
  const selectedFontSize = FONT_SIZES[fontSizeIndex]?.size

  return (
    <>
      {isModalOpen && <ImageUploadModal setIsModalOpen={setIsModalOpen} />}
      <div className={`w-full min-h-screen ${CENTER_FLEX} flex-col`}>
        <MainContainer>
          <div className={'flex h-580 w-full'}>
            <ImageFormContainer>
              <ImageContainer className={'mt-20'}>
                <ImageSpan color={textColor} fontSize={selectedFontSize} fontFamily={selectedFontFamily}>
                  {text}
                </ImageSpan>
              </ImageContainer>
              <UploadSpan className={'mt-2'}>사진으로 인식해 업로드하기</UploadSpan>
            </ImageFormContainer>
            <FormContainer>
              <Label className={'mb-2'}>쓰여질 문구</Label>
              <TextField
                onChange={(e) => {
                  if (e?.target?.value.length >= 200) return setText(e.target.value.slice(0, 200))
                  setText(e.target.value)
                }}
                height={'180px'}
                value={text}
              />
              <TextLimit>{text.length}/200</TextLimit>
              <Label className={'mb-2'}>원본 출처</Label>
              <TextField
                height={'52px'}
                onChange={(e) => {
                  if (e?.target?.value.length >= 50) return setSource(e.target.value.slice(0, 50))
                  setSource(e.target.value)
                }}
                value={source}
              />
              <TextLimit>{source.length}/50</TextLimit>
              <FlexDiv width={'100%'} height={'36px'} margin={'1'} justify={'flex-start'}>
                {FONTS.map((fontInfo, index) => (
                  <FontButton
                    fontSize={'14px'}
                    fontFamily={fontInfo.eng}
                    onClick={onClickFont(index)}
                    isClicked={isSelectedFontIndex(index)}>
                    {fontInfo.name}
                  </FontButton>
                ))}
              </FlexDiv>
              <PlainDivider />
              <FlexDiv width={'100%'} height={'46px'} margin={'1'} justify={'flex-start'}>
                {FONT_SIZES.map((fontSizeInfo, index) => (
                  <FontButton
                    fontSize={fontSizeInfo.size}
                    fontFamily={selectedFontFamily}
                    onClick={onClickFontSize(index)}
                    isClicked={isSelectedFontSizeIndex(index)}>
                    {fontSizeInfo.name}
                  </FontButton>
                ))}
              </FlexDiv>
              <PlainDivider />
              <FlexDiv margin={'0'} justify={'flex-start'}>
                <FontColorButton onClick={() => setTextColor('black')}>
                  글씨 색{textColor === 'black' && <Image src={'/post_check.svg'} width={20} height={20} />}
                </FontColorButton>
                <FontColorButton onClick={() => setTextColor('#fff')} color={'#fff'} bgColor={'#444444'}>
                  글씨 색{textColor !== 'black' && <Image src={'/post_check.svg'} width={20} height={20} />}
                </FontColorButton>
              </FlexDiv>
            </FormContainer>
          </div>
          <ImageCarousel onClickImageUploadButton={onClickImageUploadButton} />
          <div className={'my-5'}>관련된 주제를 골라주세요</div>
          <TagCarousel
            tags={DUMMY_TAGS.map((tagInfo, i) => ({ ...tagInfo, isChecked: isSelectedTag(i) }))}
            onClickTag={onClickTag}
          />
          <FlexDiv margin={'100px 0'} gap={'20px'}>
            <Button>업로드 없이 이미지만 저장하기</Button>
            <Button>업로드</Button>
          </FlexDiv>
        </MainContainer>
      </div>
    </>
  )
}

const DUMMY_TAGS = [
  {
    name: '동기부여',
    isChecked: false,
  },
  {
    name: '공부',
    isChecked: false,
  },
  {
    name: '인생',
    isChecked: true,
  },
  {
    name: '감성',
    isChecked: true,
  },
  {
    name: '위로',
    isChecked: false,
  },
  {
    name: '월요일',
    isChecked: false,
  },
]

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  width: 860px;
`

const ImageFormContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  width: 284px;
  height: 284px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
`

type FontProps = {
  fontSize?: string
  fontFamily?: string
  color?: string
}

const ImageSpan = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 24px;
  white-space: pre-wrap;
  color: ${(props: FontProps) => props.color || 'black'};
  font-size: ${(props: FontProps) => props.fontSize};
  font-family: ${(props: FontProps) => props.fontFamily || 'Noto Sans KR'};
`

const UploadSpan = styled.span`
  display: flex;
  width: 284px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: underline;
  color: #5b5b5b;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
  height: 100%;
`

const TextField = styled.textarea<{ height: string }>`
  width: 100%;
  height: ${(props: any) => `${props.height}` || 'auto'};
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
  color: #a1a1a1;
`

const TextLimit = styled.div`
  width: 100%;
  height: 18px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  padding: 0;
  font-size: 12px;
  color: #a1a1a1;
`

const FontColorButton = styled.button`
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 0 8px 0 0;
  padding: 8px;
  border-radius: 13px;
  border: solid 1px #b9b9b9;
  font-size: 12px;
  background-color: ${(props: { bgColor?: string }) => props.bgColor || 'auto'};
  color: ${(props: { color?: string }) => props.color || 'black'};
`

type FontButtonProps = FontProps & {
  isClicked?: boolean
}

const FontButton = styled.button`
  color: ${(props: FontButtonProps) => (props.isClicked ? '#000' : '#a1a1a1')};
  font-size: ${(props: FontButtonProps) => props.fontSize};
  font-family: ${(props: FontButtonProps) => props.fontFamily || 'Noto Sans KR'};
  padding: 8px;
`

export default upload
