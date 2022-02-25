import { useQuery } from 'react-query'

import { USE_FOLLOWINGS_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { FollowingsResultType, getFollowing } from '@/server/user/follow'

export const useFollowings = (userId: number | string) => {
  const id = typeof userId === 'string' ? parseInt(userId) : userId
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<FollowingsResultType>, Error>(
    [USE_FOLLOWINGS_KEY, id],
    async () => getFollowing(id),
  )
  return {
    isError: !data?.success || isError,
    isLoading,
    followings: data?.data?.followings ?? [],
    nickname: data?.data?.nickname ?? '닉네임오류',
    isSuccess,
  }
}
