import React, { useState } from 'react'

import Image from 'next/image'

import MenuButton from '@/components/button/MenuButton'
import CommentModal from '@/components/modal/CommentModal'
import { useIsMyComment } from '@/hook/isMy/useIsMyComment'
import { ReplyInfo } from '@/type/reply'

type Props = {
  comment: ReplyInfo
}

const CommentCard: React.FC<Props> = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isMe = useIsMyComment(comment)

  if (!comment?.replyId) return null

  return (
    <>
      <div>
        <div className={'w-full flex mt-6'}>
          <Image src={'/profile.svg'} width={24} height={24} alt={'profile'} />
          <p className={'text-overline'}>{comment?.replyer?.nickname}</p>
          {isMe && (
            <div className={'flex ml-auto relative'} onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
              {isModalOpen && (
                <div className={'absolute top-6 -left-52 md:left-0'}>
                  <CommentModal id={comment.replyId} />
                </div>
              )}
              <MenuButton />
            </div>
          )}
        </div>
      </div>
      <div className={'text-t16 ml-10 mb-6'}>{comment?.text}</div>
    </>
  )
}

export default CommentCard
