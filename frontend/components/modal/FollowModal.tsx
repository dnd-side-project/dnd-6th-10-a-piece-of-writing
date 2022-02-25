import React, { useRef } from 'react'

import Image from 'next/image'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

import Followers from '@/_follower/Followers'
import { UserInfo } from '@/components/_user/type'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { useClickOutside } from '@/hook/useClickOutside'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  isModalOpen: boolean
  setModalOpen: (_: boolean) => void
  followers: UserInfo[]
  isFollowing?: boolean
  nickname?: string
  isLoading?: boolean
}

const FollowModal: React.FC<Props> = ({
  isModalOpen = false,
  setModalOpen,
  followers = [],
  isFollowing = false,
  nickname = '😄',
  isLoading = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useClickOutside({
    ref: contentRef,
    func: () => {
      setModalOpen(false)
    },
  })

  return (
    <Container hidden={!isModalOpen}>
      <FlexDiv width={'100%'} height={'100%'}>
        {isLoading ? (
          <Oval height={100} />
        ) : (
          <Content ref={contentRef} className={`border-solid border-1 border-gray-200`}>
            <div className={`relative w-full ${CENTER_FLEX} h-12 border-solid border-b-1 border-b-gray-200`}>
              <div className={'flex text-t16 text-center text-ellipsis overflow-hidden whitespace-nowrap'}>
                {nickname}이(가) {isFollowing ? '팔로잉' : '팔로우'}하고 있는 {followers.length}명
              </div>
              <div className={'absolute right-2 sm:right-4 cursor-pointer'} onClick={() => setModalOpen(false)}>
                <Image src={'/close.svg'} width={24} height={24} />
              </div>
            </div>
            <div className={'flex flex-col w-full p-6'}>
              <Followers followers={followers} isSmall={true} />
            </div>
          </Content>
        )}
      </FlexDiv>
    </Container>
  )
}

const Container = styled.div`
  display: ${(props) => (props.hidden ? 'hidden' : 'block')};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  //padding-top: 100px;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-transition: 0.5s;
  overflow: ${(props) => (props.hidden ? 'hidden' : 'auto')};
  transition: all 0.3s linear;
`

const Content = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  //padding: 20px;
  border-radius: 13px;
  background-color: #fff;
  overflow: scroll;

  width: 98%;
  max-height: 80%;
  @media screen and (min-height: 800px) {
    max-height: 780px;
  }
  @media screen and (min-width: 996px) {
    width: 996px;
  }
`

export default FollowModal
