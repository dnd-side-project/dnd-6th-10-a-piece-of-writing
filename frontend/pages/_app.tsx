import '../styles/globals.css'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'

import { meAtom } from '@/atom/user/me'
import MainLayout from '@/components/layout/MainLayout'
import { loadMe } from '@/server/user'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [me, setMe] = useAtom(meAtom)
  useEffect(() => {
    if (me?.id) return
    loadMe().then((res) => {
      if (res.success) setMe(res.data)
    })
  }, [me])
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
