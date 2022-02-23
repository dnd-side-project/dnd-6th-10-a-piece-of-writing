import React from 'react'

import baxios from '@/server/axios/baxios'

type Props = {}

const test: React.FC<Props> = ({}) => {
  return (
    <>
      <button
        onClick={() => {
          baxios.get('/member/like/list').then((res) => {
            console.log(res.data)
          })
        }}>
        test
      </button>
    </>
  )
}

export default test
