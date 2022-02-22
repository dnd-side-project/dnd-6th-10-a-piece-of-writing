import React from 'react'

import Image from 'next/image'
import { useHover } from 'react-use'
import styled from 'styled-components'

import CommentButton from '@/components/button/CommentButton'
import DownloadButton from '@/components/button/DownloadButton'
import LikeButton from '@/components/button/LikeButton'
import ShareButton from '@/components/button/ShareButton'

type Props = {}

const Post: React.FC<Props> = ({}) => {
  const imgUrl = 'https://fakeimg.pl/300/'

  const download = (imgUrl: string) => () => {
    fetch(imgUrl, {
      method: 'GET',
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'image.png') //or any other extension
          document.body.appendChild(link)
          link.click()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const share = (imgUrl: string) => () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.')
    }

    const textarea = document.createElement('textarea')
    textarea.value = imgUrl
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('클립보드에 복사되었습니다.')
  }

  const element = (hovered: boolean) => (
    <PostContainer>
      {hovered ? (
        <>
          <NickNameContainer>
            <Image src={'/profile.svg'} width={24} height={24} />
            <p className={'text-overline'}>유저 닉네임</p>
          </NickNameContainer>
          <div className={'mt-185px w-full flex flex-wrap justify-around'}>
            <LikeButton />
            <CommentButton />
            <DownloadButton onClick={download(imgUrl)} />
            <ShareButton onClick={share(imgUrl)} />
          </div>
        </>
      ) : (
        ''
      )}
    </PostContainer>
  )

  const [hoverable] = useHover(element)

  return <>{hoverable}</>
}

export default Post

const NickNameContainer = styled.div`
  width: 117px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  margin-left: 16px;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`

const PostContainer = styled.div`
  width: 285px;
  height: 285px;
  border-radius: 13px;
  background-color: #e8e8e8;
`
