import React from 'react'

import DummyCard from '@/components/card/DummyCard'
import { PlainDivider } from '@/components/divider'
import { emailCheck } from '@/server/user'
import { FlexDiv } from '@/components/style/div/FlexDiv'

const index = () => {
  return (
    <>
      <p className={'text-h2 ml-20'}>Pages</p>
      <div className={'grid grid-cols-3 gap-2 w-full h-120 p-5'}>
        <DummyCard href={'/feed'} title={'메인'} content={'메인 피드입니다. (목업상태)'} />
        <DummyCard href={'/upload'} title={'업로드'} content={'게시글 업로드입니다. \n 배경사진 crop 기능까지 구현'} />
        <DummyCard href={'/register'} title={'회원가입'} content={'회원가입 페이지입니다.'} />
        <DummyCard href={'/login'} title={'로그인'} content={'로그인 페이지입니다.'} />
      </div>
      <PlainDivider />
      <p className={'text-h2 ml-20'}>기타</p>
      <div className={'grid grid-cols-3 gap-2 w-full h-64 p-5'}>
        <DummyCard href={'/main'} title={'가변 게시글'} content={'기타 (서비스와 상관없음, 테스트용)'} />
        <button
          onClick={() => {
            try {
              emailCheck('test')
            } catch (e) {
              console.log(e)
            }
          }}>
          테스트
        </button>
      </div>
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
