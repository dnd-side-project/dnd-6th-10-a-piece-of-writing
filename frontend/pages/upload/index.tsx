import React from 'react'

import { Button } from '@/components/button'
import { TopicCarousel } from '@/components/carousel'
import BackgroundImageCarousel from '@/components/carousel/BackgroundImageCarousel'
import ImageUploadModal from '@/components/modal/ImageUploadModal'
import { FlexDiv } from '@/components/style/div/FlexDiv'

import 'rc-slider/assets/index.css'
import 'cropperjs/dist/cropper.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import MainForm from '@/components/_upload/MainForm'
import { useSsrMe } from '@/hook/useSsrMe'
import { useToggles } from '@/hook/useToggles'
import { loadMainTopics, TopicInfo } from '@/server/topic'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { BreakPoints } from '@/styles/breakPoint'
import { CENTER_FLEX } from '@/styles/classNames'

import styled from 'styled-components'

import { isUploadModalOpenAtom } from '@/atom/post'

import { useAtom } from 'jotai'

import { UserInfo as UserInfoType } from '@/type/user'
import { topicsAtom } from '@/atom/topic'

import { GetServerSidePropsContext } from 'next'

type ServerSideProps = { me: UserInfoType; ssrTopics: TopicInfo[] }

const Upload: React.FC<ServerSideProps> = ({ me, ssrTopics }) => {
  useSsrMe(me, [[topicsAtom, ssrTopics ?? []]])
  // useNeedLogin()
  const [isUploadModalOpen, setIsUploadModalOpen] = useAtom(isUploadModalOpenAtom)
  const [topics] = useAtom(topicsAtom)
  console.log({ topics })

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedIndexes: topicIndexes,
    isSelectedIndex: isSelectedTopic,
    onToggle: onClickTopic,
  } = useToggles({ defaultIndexes: [0], singleMode: false })

  const onClickImageUploadButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsUploadModalOpen((_isUploadModalOpen) => !_isUploadModalOpen)
  }

  const onClickUpload = () => {}

  return (
    <>
      {isUploadModalOpen && <ImageUploadModal setIsModalOpen={setIsUploadModalOpen} />}
      <div className={`w-full min-h-screen ${CENTER_FLEX} flex-col flex-nowrap align-middle`}>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap p-4`}>
          <MainContainer>
            <MainForm />
          </MainContainer>
        </div>
        <div className={`${CENTER_FLEX} mt-5 w-full flex-nowrap`}>
          <div className={'w-full md:w-5/6'}>
            <BackgroundImageCarousel onClickImageUploadButton={onClickImageUploadButton} />
          </div>
        </div>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap`}>
          <TopicContainer>
            <div className={'w-full'}>
              <div className={'my-5'}>관련된 주제를 골라주세요</div>
              <TopicCarousel
                topics={DUMMY_TOPICS.map((topicInfo, i) => ({ ...topicInfo, isChecked: isSelectedTopic(i) }))}
                onClickTopic={onClickTopic}
              />
            </div>
          </TopicContainer>
        </div>
        <div className={`w-full ${CENTER_FLEX} flex-nowrap`}>
          <TopicContainer>
            <FlexDiv margin={'100px 0'} gap={'20px'}>
              {/*<Button>업로드 없이 이미지만 저장하기</Button>*/}
              <Button onClick={onClickUpload}>업로드</Button>
            </FlexDiv>
          </TopicContainer>
        </div>
      </div>
    </>
  )
}

const DUMMY_TOPICS = [
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
  padding: 0.35rem;
  @media screen and (min-width: ${BreakPoints.md}) {
    width: 950px;
  }
`

const TopicContainer = styled.div`
  display: flex;
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

export const getServerSideProps = withAuthServerSideProps(async (ctx: GetServerSidePropsContext) => {
  const result = await loadMainTopics(ctx)
  const exampleTopics = result.success ? result.data ?? [] : []
  console.log({ result })
  return {
    ssrTopics: exampleTopics,
  }
})

export default Upload
