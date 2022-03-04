import React from 'react'

import { useAtom } from 'jotai'
import styled from 'styled-components'

import { ProfileTab, userProfileTabAtom } from '@/atom/user'
import { useIsMe } from '@/hook/isMy/useIsMe'
import { CENTER_FLEX } from '@/styles/classNames'
import { UserInfo } from '@/type/user'

type Props = { userInfo: UserInfo }

const UserPostLabel: React.FC<Props> = ({ userInfo }) => {
  const isMe = useIsMe(userInfo?.id)
  const [userProfileTab, setUserProfileTabAtom] = useAtom(userProfileTabAtom)
  const isPostTab = userProfileTab === ProfileTab.POST
  const isLikeTab = userProfileTab === ProfileTab.LIKE

  return (
    <div className={'w-full border-solid mt-8'}>
      {isMe ? (
        <div className={'flex w-full'}>
          <div
            className={`w-1/2 ${CENTER_FLEX} hover:bg-blue-100 cursor-pointer border-solid border-y-1 border-y-gray-200 py-3 ${
              isPostTab ? 'border-b-gray-600' : ''
            }`}
            onClick={() => setUserProfileTabAtom(ProfileTab.POST)}>
            <Span>나의 글조각</Span>
          </div>
          <div
            className={`w-1/2 ${CENTER_FLEX} hover:bg-blue-100 cursor-pointer border-solid  border-y-1 border-y-gray-200 py-3 ${
              isLikeTab ? 'border-b-gray-600' : ''
            }`}
            onClick={() => setUserProfileTabAtom(ProfileTab.LIKE)}>
            <Span>나의 좋아요</Span>
          </div>
        </div>
      ) : (
        <div className={`${CENTER_FLEX} py-3 border-solid border-y-1 border-gray-200`}>
          <Span>올린 글조각</Span>
        </div>
      )}
    </div>
  )
}

const Span = styled.span`
  font-size: 21px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: normal;
  color: #2c2c2c;
`

export default UserPostLabel
