import React from 'react'
import styled from 'styled-components'
import { CENTER_FLEX } from '@/styles/classNames'
import { Label } from '@/components/Form/register/RegisterMainForm'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { PlainDivider } from '@/components/divider'

type Props = {}

const upload: React.FC<Props> = ({}) => {
  return (
    <>
      <div className={`w-full min-h-screen ${CENTER_FLEX}`}>
        <MainContainer>
          <div className={'flex h-580 w-full'}>
            <ImageFormContainer>
              <ImageContainer className={'mt-20'}>
                <ImageSpan>
                  testtest test testtest test testtest test testtest test testtest test testtest test{' '}
                </ImageSpan>
              </ImageContainer>
              <UploadSpan className={'mt-2'}>사진으로 인식해 업로드하기</UploadSpan>
            </ImageFormContainer>
            <FormContainer>
              <Label>쓰여질 문구</Label>
              <TextField height={'180px'}>흰 봉투에 ~~~</TextField>
              <TextLimit>0/200</TextLimit>
              <Label>원본 출처</Label>
              <TextField height={'52px'}>책 제목-작가 / 영화제목/ 노래 제목 - 가수</TextField>
              <TextLimit>0/50</TextLimit>
              <FlexDiv width={'100%'} height={'36px'} margin={'1'} justify={'flex-start'}>
                <button>노토산스</button>
                <button>노토산스</button>
                <button>노토산스</button>
                <button>노토산스</button>
              </FlexDiv>
              <PlainDivider />
              <FlexDiv width={'100%'} height={'46px'} margin={'1'} justify={'flex-start'}>
                <button>작은글씨</button>
                <button>중간글씨</button>
                <button>큰글씨</button>
                <button>가장큰글씨</button>
              </FlexDiv>
              <PlainDivider />
              <FlexDiv margin={'0'}>
                <FontColorButton>글씨 색</FontColorButton>
                <FontColorButton color={'#fff'} bgColor={'#444444'}>
                  글씨 색
                </FontColorButton>
              </FlexDiv>
            </FormContainer>
          </div>
        </MainContainer>
      </div>
    </>
  )
}

const MainContainer = styled.div`
  display: flex;
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
`

const ImageSpan = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 24px;
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

const TextField = styled.div<{ height: string }>`
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
  width: 58px;
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

export default upload
