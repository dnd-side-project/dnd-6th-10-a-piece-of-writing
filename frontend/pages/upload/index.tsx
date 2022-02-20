import React from 'react'

import { Button } from '@/components/button'
import { TagCarousel } from '@/components/carousel'
import BackgroundImageCarousel from '@/components/carousel/BackgroundImageCarousel'
import ImageUploadModal from '@/components/modal/ImageUploadModal'
import { FlexDiv } from '@/components/style/div/FlexDiv'

import 'rc-slider/assets/index.css'
import 'cropperjs/dist/cropper.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import MainForm from '@/components/_upload/MainForm'
import { useToggles } from '@/hook/useToggles'
import { BreakPoints } from '@/styles/breakPoint'
import { CENTER_FLEX } from '@/styles/classNames'

import styled from 'styled-components'

import { isUploadModalOpenAtom } from '@/atom/post'

import { useAtom } from 'jotai'

type Props = {}

const Upload: React.FC<Props> = ({}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useAtom(isUploadModalOpenAtom)

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedIndexes: tagIndexes,
    isSelectedIndex: isSelectedTag,
    onToggle: onClickTag,
  } = useToggles({ defaultIndexes: [0], singleMode: false })

  const onClickImageUploadButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsUploadModalOpen((_isUploadModalOpen) => !_isUploadModalOpen)
  }

  return (
    <>
      {isUploadModalOpen && <ImageUploadModal setIsModalOpen={setIsUploadModalOpen} />}
      <div className={`w-full min-h-screen ${CENTER_FLEX} flex-col flex-nowrap align-middle`}>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap`}>
          <MainContainer>
            <MainForm />
          </MainContainer>
        </div>
        <div className={`${CENTER_FLEX} mt-10 w-full flex-nowrap`}>
          <div className={'w-full md:w-5/6'}>
            <BackgroundImageCarousel onClickImageUploadButton={onClickImageUploadButton} />
          </div>
        </div>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap`}>
          <TagContainer>
            <div className={'w-full'}>
              <div className={'my-5'}>관련된 주제를 골라주세요</div>
              <TagCarousel
                tags={DUMMY_TAGS.map((tagInfo, i) => ({ ...tagInfo, isChecked: isSelectedTag(i) }))}
                onClickTag={onClickTag}
              />
            </div>
          </TagContainer>
        </div>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap`}>
          <TagContainer>
            <FlexDiv margin={'100px 0'} gap={'20px'}>
              <Button>업로드 없이 이미지만 저장하기</Button>
              <Button>업로드</Button>
            </FlexDiv>
          </TagContainer>
        </div>
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 1em;
  width: 100%;
  @media screen and (min-width: ${BreakPoints.md}) {
    width: 950px;
  }
`

const TagContainer = styled.div`
  disp
  lay: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 1em;
  width: 90%;
  @media screen and (min-width: ${BreakPoints.md}) {
    width: 950px;
  }
`

export default Upload
