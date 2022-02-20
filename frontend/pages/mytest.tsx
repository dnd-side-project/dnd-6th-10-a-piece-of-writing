import React from 'react'

import { loadMe } from '@/server/user'

type Props = {}

const test: React.FC<Props> = ({}) => {
  return (
    <>
      <button
        onClick={async () => {
          const res = await loadMe()
          console.log(res)
        }}>
        ggg
      </button>
    </>
  )
}

export default test
