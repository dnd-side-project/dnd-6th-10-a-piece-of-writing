import { useHydrateAtoms } from 'jotai/utils'

import { meAtom } from '@/atom/user/me'
import { UserInfo } from '@/components/_user/type'

export const useSsrMe = (me: UserInfo) => {
  useHydrateAtoms([[meAtom, me]] as const)
}
