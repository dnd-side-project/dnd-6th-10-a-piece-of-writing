import { useQuery } from 'react-query'

import { USER_PROFILE_KEY } from '@/hook/react-query/key'
import { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadProfile } from '@/server/user/profile'
import { UserInfo } from '@/type/user'

export const useUserProfile = (userId: number | string, enabled?: boolean) => {
  const id = typeof userId === 'string' ? parseInt(userId) : userId
  const { isError, isLoading, data, isSuccess } = useQuery<RESPONSE_TYPE<UserInfo>, Error>(
    [USER_PROFILE_KEY, id],
    async () => loadProfile(id),
    {
      enabled,
    },
  )
  return { isError: !data?.success || isError, isLoading, userInfo: data?.data ?? null, isSuccess }
}
