import { useQuery } from 'react-query'

import { USE_FOLLOWERS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { FollowersResultType, getFollower } from '@/server/user/follow'

export const useFollowers = (userId: number | string) => {
  const id = typeof userId === 'string' ? parseInt(userId) : userId
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<FollowersResultType>, Error>(
    [USE_FOLLOWERS_KEY, id],
    async () => getFollower(id),
  )
  return {
    isError: !data?.success || isError,
    isLoading,
    followers: data?.data?.followers ?? [],
    nickname: data?.data?.nickname ?? '닉네임오류',
    isSuccess,
  }
}
