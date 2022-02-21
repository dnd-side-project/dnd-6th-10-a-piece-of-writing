import React from 'react'

import DummyCard from '@/components/card/DummyCard'
import { PlainDivider } from '@/components/Divider'
import { FlexDiv } from '@/components/style/div/FlexDiv'

const index = () => {
  return (
    <>
      <p className={'text-h2 ml-20'}>Pages</p>
      <div className={'grid grid-cols-3 gap-2 w-full h-120 p-5'}>
        <DummyCard href={'/feed'} title={'메인'} content={'메인 피드입니다. (목업상태)'} />
        <DummyCard href={'/modify'} title={'수정'} content={'프로필 수정입니다. (목업상태)'} />
        <DummyCard href={'/follower'} title={'팔로워'} content={'팔로워입니다. (목업상태)'} />
        <DummyCard href={'/user/123'} title={'유저프로필'} content={'유저 프로필입니다. (목업상태)'} />
        <DummyCard href={'/postcard'} title={'포스트'} content={'포스트 예시입니다. (목업상태)'} />
        <DummyCard href={'/withdraw'} title={'탈퇴'} content={'탈퇴하기 페이지'} />
        <DummyCard href={'/upload'} title={'업로드'} content={'게시글 업로드입니다. \n 배경사진 crop 기능까지 구현'} />
        <DummyCard href={'/register'} title={'회원가입'} content={'회원가입 페이지입니다.'} />
        <DummyCard href={'/login'} title={'로그인'} content={'로그인 페이지입니다.'} />
      </div>
      <PlainDivider />
      <p className={'text-h2 ml-20'}>기타</p>
      <div className={'grid grid-cols-3 gap-2 w-full h-64 p-5'}></div>
      <FlexDiv>
        <h1 className={'mt-5'}>
          {' '}
          제플린 기반의 더미 페이지들입니다. 백엔드 API 연동은 아직 안되어 있습니다. (기능은 동작하지 않을 확률이 높음)
        </h1>
      </FlexDiv>
    </>
  )
}

export default index
