import { useHydrateAtoms } from 'jotai/utils'

import { meAtom } from '@/atom/user/me'
import { UserInfo } from '@/type/user'

export const useSsrMe = (me: UserInfo, otherValues: any = []) => {
  useHydrateAtoms([[meAtom, me], ...otherValues] as const)
}
