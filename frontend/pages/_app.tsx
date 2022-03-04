import '../styles/globals.css'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { meAtom } from '@/atom/user/me'
import MainLayout from '@/components/layout/MainLayout'
import { loadMe } from '@/server/user'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5, // 5 mins
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const [me, setMe] = useAtom(meAtom)
  useEffect(() => {
    if (me?.id) return
    loadMe().then((res) => {
      if (res.success) setMe(res.data)
    })
  }, [me])
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  )
}
