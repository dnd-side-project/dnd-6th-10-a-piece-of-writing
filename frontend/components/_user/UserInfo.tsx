import React, { useRef, useState } from 'react'

import { useUpdateAtom } from 'jotai/utils'
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
import { CENTER_FLEX, HOVER_BLUE } from '@/styles/classNames'

type Props = {
  isMe?: boolean
  nickname?: string
  followed?: boolean
}

const UserInfo: React.FC<Props> = ({ isMe = false, nickname = '유저 닉네임', followed }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const setMe = useUpdateAtom(meAtom)
  console.log({ isMe })

  const imageInputRef = useRef<HTMLInputElement>(null)

  const onClickLogout = async () => {
    const res = await logout(setMe)
    alert(res.message)
    if (res.success) router.push('/')
  }

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imageFile = e.currentTarget.files?.[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
      setLoading(false)
    }
    imageFile && setImage(imageFile)
    imageFile && reader.readAsDataURL(imageFile)
    const formData = new FormData()
    formData.append('file', image)
    setLoading(true)
  }

  const onClickEdit = () => {
    imageInputRef?.current?.click()
  }

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
          imgSrc={previewUrl === '' ? undefined : previewUrl}
        />
      )}
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
