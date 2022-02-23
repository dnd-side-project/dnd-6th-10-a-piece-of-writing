import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

import Followers from '@/_follower/Followers'
import FollowLabel from '@/_follower/FollowLabel'
import { UserInfo } from '@/components/_user/type'
import { getFollower } from '@/server/user/follow'
import { CENTER_FLEX } from '@/styles/classNames'

const Following: React.FC = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo[]>([])

  useEffect(() => {
    if (typeof id !== 'string') return
    setLoading(true)
    getFollower(parseInt(id))
      .then((res) => {
        if (res.success && res.data) {
          setUserInfo(res.data.followings)
          setNickname(res.data.nickname)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  return (
    <div className={`w-full ${CENTER_FLEX}`}>
      {loading ? (
        <div className={`w-full h-full ${CENTER_FLEX}`}>
          <Oval height={100} />
        </div>
      ) : (
        <Container>
          <div className={'my-10'}>
            <FollowLabel nickname={nickname} count={userInfo.length} isFollow={false} />
          </div>
          <Followers followers={userInfo} />
        </Container>
      )}
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  margin-left: 1rem;

  @media screen and (min-width: 400px) {
    margin-left: 2rem;
  }

  @media screen and (min-width: 800px) {
    margin-left: 4rem;
  }

  @media screen and (min-width: 1201px) {
    width: 1201px;
    margin-left: 0;
  }
`

export default Following
