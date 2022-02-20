import React from 'react'

type Props = { followerCount: number }

const FollowerLabel: React.FC<Props> = ({ followerCount }) => {
  return (
    <>
      <p className={'mt-28 text-h4 font-bold md:text-h2'}>나를 팔로우하고 있는 {followerCount}명</p>
    </>
  )
}

export default FollowerLabel
