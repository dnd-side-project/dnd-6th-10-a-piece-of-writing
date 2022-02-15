import React from 'react'

import Image from 'next/image'

import CommentInput from '@/components/input/CommentInput'

type Props = {
  text: string
  nickName: string
}

const CommentCard: React.FC<Props> = ({ text, nickName }) => {
  return (
    <>
      <div>
        <div className={'w-full flex mt-6'}>
          <Image src={'/profile.svg'} width={24} height={24} alt={'profile'} />
          <p className={'text-overline'}>{nickName}</p>
        </div>
      </div>
      <div className={'text-t16 ml-10 mb-6'}>{text}</div>
      <CommentInput />
    </>
  )
}

export default CommentCard
