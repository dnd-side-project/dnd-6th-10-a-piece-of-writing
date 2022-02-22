import React, { useState } from 'react'

import Image from 'next/image'

import MenuButton from '@/components/button/MenuButton'
import CommentModal from '@/components/modal/CommentModal'

type Props = {
  text: string
  nickName: string
  isMe?: boolean
}

const CommentCard: React.FC<Props> = ({ text, nickName, isMe = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div>
        <div className={'w-full flex mt-6'}>
          <Image src={'/profile.svg'} width={24} height={24} alt={'profile'} />
          <p className={'text-overline'}>{nickName}</p>
          {isMe && (
            <div className={'flex ml-auto relative'} onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
              {isModalOpen && (
                <div className={'absolute top-6 -left-52 md:left-0'}>
                  <CommentModal />
                </div>
              )}
              <MenuButton />
            </div>
          )}
        </div>
      </div>
      <div className={'text-t16 ml-10 mb-6'}>{text}</div>
    </>
  )
}

export default CommentCard
