import React, { useRef, useState } from 'react'

import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Oval } from 'react-loader-spinner'

import { meAtom } from '@/atom/user/me'
import FollowButton from '@/components/button/FollowButton'
import MenuButton from '@/components/button/MenuButton'
import ProfileImageCard from '@/components/card/ProfileImageCard'
import UserSummaryCard from '@/components/card/UserSummaryCard'
import { MenuModalContainer } from '@/components/container/MenuModalContainer'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { logout } from '@/server/user'
import { setProfileImage } from '@/server/user/profile'
import { CENTER_FLEX, HOVER_BLUE } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type Props = {
  userInfo: UserInfoType
}

const UserInfo: React.FC<Props> = ({ userInfo }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [me, setMe] = useAtom(meAtom)
  const isMe = me?.id === userInfo?.id

  const imageInputRef = useRef<HTMLInputElement>(null)

  const onClickLogout = async () => {
    const res = await logout(setMe)
    alert(res.message)
    if (res.success) router.push('/')
  }

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLoading(true)
    const imageFile = e.currentTarget.files?.[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
      setLoading(false)
    }
    const formData = new FormData()
    imageFile && reader.readAsDataURL(imageFile)
    imageFile && formData.append('file', imageFile)
    setProfileImage(formData).then((res) => {
      alert(res.message)
      if (me) setMe({ ...me, profileUrl: res.data })
    })
  }

  const onClickEdit = () => {
    imageInputRef?.current?.click()
  }

  if (!userInfo) return null

  return (
    <div className={`w-full relative ${CENTER_FLEX} flex-col mt-14`}>
      {isMe && (
        <>
          <input
            className={'hidden'}
            ref={imageInputRef}
            type={'file'}
            id={'image-input'}
            accept={'image/*'}
            name={'file'}
            multiple={false}
            onChange={onImageChange}
          />
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
              <div className={`cursor-pointer ${HOVER_BLUE} w-full`} onClick={onClickLogout}>
                로그아웃
              </div>
              <Link href={'/withdraw'}>
                <div className={`cursor-pointer ${HOVER_BLUE} w-full`}>탈퇴하기</div>
              </Link>
            </MenuModalContainer>
          )}
        </>
      )}
      {loading ? (
        <FlexDiv height={'120px'}>
          <Oval />
        </FlexDiv>
      ) : (
        <ProfileImageCard
          editable={isMe}
          onClickEdit={onClickEdit}
          imgSrc={userInfo.profileUrl ?? (previewUrl === '' ? undefined : previewUrl)}
        />
      )}
      <div className={'relative my-4 mb-5 w-64 text-center align-middle'}>
        <span className={'text-t16 font-semibold text-center'}>{userInfo?.nickname}</span>
        {!isMe && (
          <div className={'absolute right-0 translate-y-2/4 bottom-1/2 '}>
            <FollowButton userId={userInfo?.id} followed={userInfo?.alreadyFollow} />
          </div>
        )}
      </div>
      <UserSummaryCard userInfo={userInfo} />
    </div>
  )
}

export default UserInfo
