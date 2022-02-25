import { useQuery } from 'react-query'

import { UserInfo } from '@/components/_user/type'
import { USER_PROFILE_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadProfile } from '@/server/user/profile'

export const useUserProfile = (userId: number | string) => {
  const id = typeof userId === 'string' ? parseInt(userId) : userId
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<UserInfo>, Error>(
    [USER_PROFILE_KEY, id],
    async () => loadProfile(id),
  )
  return { isError: !data?.success || isError, isLoading, userInfo: data?.data ?? null, isSuccess }
}
