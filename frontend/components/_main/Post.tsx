import React from 'react'

import Image from 'next/image'
import styled from 'styled-components'

type Props = {}

const Post: React.FC<Props> = ({}) => {
  return (
    <PostContainer>
      <NickNameContainer>
        <Image src={'/profile.svg'} width={24} height={24} />
        <p className={'text-overline'}>유저 닉네임</p>
      </NickNameContainer>
      <div className={'mt-185px w-full flex flex-wrap justify-around'}>
        <IconContainer>
          <Image src={'/like.svg'} width={24} height={24} />
        </IconContainer>
        <IconContainer>
          <Image src={'/comment.svg'} width={24} height={24} />
        </IconContainer>
        <IconContainer>
          <Image src={'/download.svg'} width={24} height={24} />
        </IconContainer>
        <IconContainer>
          <Image src={'/share.svg'} width={24} height={24} />
        </IconContainer>
      </div>
    </PostContainer>
  )
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

export const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`
