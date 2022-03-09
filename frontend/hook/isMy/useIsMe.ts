import { useAtomValue } from 'jotai/utils'

import { meAtom } from '@/atom/user/me'

export const useIsMe = (userId?: number) => {
  const me = useAtomValue(meAtom)
  if (!userId || !me?.id) return false
  return me?.id === userId
}
