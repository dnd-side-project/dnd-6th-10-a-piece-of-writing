import React from 'react'

import CheckButton, { CheckButtonColor } from '@/components/button/CheckButton'

type Props = {
  followed?: boolean
  onClick?: () => {}
}

const FollowButton: React.FC<Props> = ({ followed = false, onClick = () => {} }) => {
  return (
    <div className={'flex text-t16 p-1 px-2 hover:bg-amber-200 cursor-pointer rounded-md'} onClick={onClick}>
      <button className={'text-amber-500 mr-1'}>{followed ? '팔로잉' : '팔로우'}</button>
      {followed && <CheckButton width={14} height={14} noContainer color={CheckButtonColor.ORANGE} />}
    </div>
  )
}

export default FollowButton
