import React, { useState } from 'react'

import Link from 'next/link'

import FollowButton from '@/components/button/FollowButton'
import MenuButton from '@/components/button/MenuButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import UserSummaryCard from '@/components/card/UserSummaryCard'
import { MenuModalContainer } from '@/components/container/MenuModalContainer'
import { CENTER_FLEX, HOVER_BLUE } from '@/styles/classNames'

type Props = {
  isMe?: boolean
  nickname?: string
  followed?: boolean
}

const UserInfo: React.FC<Props> = ({ isMe = false, nickname = '유저 닉네임', followed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={`w-full relative ${CENTER_FLEX} flex-col mt-14`}>
      {isMe && (
        <>
          <div className={'absolute right-1/4 top-0'}>
            <MenuButton
              onClick={() => {
                setIsModalOpen((isModalOpen) => !isModalOpen)
              }}
            />
          </div>
          {isModalOpen && (
            <MenuModalContainer right={'20%'} top={'25px'} width={'200px'}>
              <div className={`cursor-pointer ${HOVER_BLUE} w-full`}>수정하기</div>
              <div className={`cursor-pointer ${HOVER_BLUE} w-full`}>로그아웃</div>
              <Link href={'/withdraw'}>
                <div className={`cursor-pointer ${HOVER_BLUE} w-full`}>탈퇴하기</div>
              </Link>
            </MenuModalContainer>
          )}
        </>
      )}
      <ProfileImageCard editable={true} />
      <div className={'relative my-4 mb-5 w-64 text-center align-middle'}>
        <span className={'text-t16 font-semibold text-center'}>{nickname}</span>
        <div className={'absolute right-0 translate-y-2/4 bottom-1/2 '}>
          <FollowButton followed={followed} />
        </div>
      </div>
      <UserSummaryCard />
    </div>
  )
}

export default UserInfo
