import React from 'react'

type Props = { nickname?: string; isFollow?: boolean; count: number }

const FollowLabel: React.FC<Props> = ({ nickname = '나', isFollow = false, count }) => {
  const followWord = isFollow ? `팔로잉` : `팔로워`
  const noResultTtext = isFollow
    ? `${nickname}님은 팔로잉중인 사람이 없습니다.`
    : `${nickname}님을 팔로우하는 사람이 없습니다.`
  return (
    <>
      <p className={'mt-28 text-h4 font-bold md:text-h2'}>
        {count === 0 ? noResultTtext : `${nickname}의 ${followWord} ${count}명`}
      </p>
    </>
  )
}

export default FollowLabel
