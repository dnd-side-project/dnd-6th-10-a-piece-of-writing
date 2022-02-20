import React from 'react'

import Image from 'next/image'

type Props = {
  onClick?: () => void
}

const MenuButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={'ml-auto cursor-pointer'} onClick={onClick}>
      <Image src={'/dots-vertical.svg'} width={24} height={24} alt={'dots-vertical'} />
    </div>
  )
}

export default MenuButton
