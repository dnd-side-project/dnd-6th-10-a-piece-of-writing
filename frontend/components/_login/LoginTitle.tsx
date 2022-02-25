import React from 'react'

type Props = {}

const LoginTitle: React.FC<Props> = ({}) => {
  return (
    <>
      <div className={'flex flex-col justify-center'}>
        <span className={'whitespace-pre-line text-h3 sm:text-h1'}>{'글 한 조각, \n 함께 나눠볼까요?'}</span>
        <span className={'mt-4 whitespace-pre-line text-t16'}>
          {'일상에서 발견한 오늘의 글귀들을 \n 아카이빙하여 서로 나눠보세요.'}
        </span>
      </div>
    </>
  )
}

export default LoginTitle
