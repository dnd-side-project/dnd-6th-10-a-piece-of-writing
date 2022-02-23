import React from 'react'

import CheckButton, { CheckButtonColor } from '@/components/button/CheckButton'
import { follow, unfollow } from '@/server/user/follow'

type Props = {
  userId: number
  followed?: boolean
}

const FollowButton: React.FC<Props> = ({ userId, followed = false }) => {
  const onClickFollow = () => {
    if (followed) {
      // TODO : followings에서 제거
      unfollow(userId).then((res) => {
        alert(res.message)
      })
      return
    }
    follow(userId).then((res) => {
      alert(res.message)
      // TODO : followings에 추가
    })
  }
  return (
    <div className={'flex text-t16 p-1 px-2 hover:bg-amber-200 cursor-pointer rounded-md'} onClick={onClickFollow}>
      <button className={'text-amber-500 mr-1'}>{followed ? '팔로잉' : '팔로우'}</button>
      {followed && <CheckButton width={14} height={14} noContainer color={CheckButtonColor.ORANGE} />}
    </div>
  )
}

export default FollowButton
