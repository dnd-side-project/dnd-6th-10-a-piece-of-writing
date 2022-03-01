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
import { PostData, uploadPost } from '@/server/post'
import { loadMainTopics, TopicInfo } from '@/server/topic'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { BreakPoints } from '@/styles/breakPoint'
import { CENTER_FLEX } from '@/styles/classNames'

import styled from 'styled-components'

import { isUploadModalOpenAtom, postImageElemAtom, postTextAtom, sourceTextAtom } from '@/atom/post'

import { useAtom } from 'jotai'

import { UserInfo as UserInfoType } from '@/type/user'
import { checkedTopicsAtom, checkTopicUpdateAtom, topicsAtom } from '@/atom/topic'

import { GetServerSidePropsContext } from 'next'
import { useAtomValue } from 'jotai/utils'
import html2canvas from 'html2canvas'

import { dataURItoBlob } from '@/util'

type ServerSideProps = { me: UserInfoType; ssrTopics: TopicInfo[] }

const Upload: React.FC<ServerSideProps> = ({ me, ssrTopics }) => {
  useSsrMe(me, [[topicsAtom, ssrTopics ?? []]])
  // useNeedLogin()
  const [, checkTopicUpdate] = useAtom(checkTopicUpdateAtom)
  const [isUploadModalOpen, setIsUploadModalOpen] = useAtom(isUploadModalOpenAtom)
  const [postImageElem] = useAtom(postImageElemAtom)
  const topics = useAtomValue(topicsAtom)
  const checkedTopics = useAtomValue(checkedTopicsAtom)
  const postText = useAtomValue(postTextAtom)
  const sourceText = useAtomValue(sourceTextAtom)
  console.log({ topics })

  const onClickTopic = (i: number) => () => checkTopicUpdate(i)

  const onClickImageUploadButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsUploadModalOpen((_isUploadModalOpen) => !_isUploadModalOpen)
  }

  const exportAsImage = async (element: HTMLElement) => {
    const canvas = await html2canvas(element)
    const image = canvas.toDataURL('image/png', 1.0)
    return dataURItoBlob(image)
  }

  const onClickUpload = async () => {
    if (!postImageElem) {
      alert('이미지에 오류가 발생했습니다.')
      return
    }
    const postData: PostData = {
      authorId: me?.id ?? 1,
      content: postText ?? '',
      ref: sourceText ?? '',
      topicList: checkedTopics.map((topic) => topic.topicId) ?? [],
    }

    const formData = new FormData()
    const image = await exportAsImage(postImageElem)
    formData.append('file', image)
    formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }))
    uploadPost({ formData }).then((res) => {
      alert(res.message)
    })
  }

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
              <TopicCarousel topics={topics} onClickTopic={onClickTopic} />
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
