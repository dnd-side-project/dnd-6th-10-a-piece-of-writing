import { useEffect } from 'react'

import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'

import { isLoginedAtom } from '@/atom/user/me'

const useNeedLogin = () => {
  const router = useRouter()
  const isLogined = useAtomValue(isLoginedAtom)
  useEffect(() => {
    if (!isLogined) {
      alert('로그인이 필요합니다!')
      router.back()
    }
  }, [isLogined])
}

export default useNeedLogin
