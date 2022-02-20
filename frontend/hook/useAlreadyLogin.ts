import { useEffect } from 'react'

import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'

import { meAtom } from '@/atom/user/me'

const useAlreadyLogin = () => {
  const me = useAtomValue(meAtom)
  const router = useRouter()
  useEffect(() => {
    if (me !== null) {
      alert('이미 로그인 되어있습니다!')
      router.back()
    }
  }, [me])
}

export default useAlreadyLogin
