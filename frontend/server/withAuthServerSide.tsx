import React from 'react'

import { GetServerSidePropsContext } from 'next'

import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '@/constant'
import { loadMe } from '@/server/user'

export function withAuthServerSideProps(getServerSidePropsFunc?: Function) {
  return async (context: GetServerSidePropsContext) => {
    console.log([context?.req?.cookies?.[KEY_ACCESS_TOKEN], context?.req?.cookies?.[KEY_REFRESH_TOKEN]])
    const res = await loadMe(context?.req?.cookies?.[KEY_ACCESS_TOKEN], context?.req?.cookies?.[KEY_REFRESH_TOKEN])
    const me = res.success ? res.data : null
    if (getServerSidePropsFunc) {
      return { props: { me, data: await getServerSidePropsFunc(context, me) } }
    }
    return { props: { me, data: { props: { me } } } }
  }
}

// withAuthComponent.tsx
export function withAuthComponent(Component: any) {
  return ({ user, data }: { user: any; data: any }) => {
    if (!user) {
      return <h1>로그인이 필요한 페이지입니다.</h1> // or redirect, we can use the Router because we are client side here
    }
    return <Component {...data.props} />
  }
}
