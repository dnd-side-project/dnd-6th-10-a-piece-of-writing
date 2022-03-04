import { useAtomValue } from 'jotai/utils'

import { meAtom } from '@/atom/user/me'

export const useIsMyPost = (postId?: number) => {
  const me = useAtomValue(meAtom)
  if (!postId || !me?.id) return false
  return me?.id === postId
}
