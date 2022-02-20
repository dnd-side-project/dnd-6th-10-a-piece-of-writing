import React from 'react'

import { loadMe } from '@/server/user'

export function withAuthServerSideProps(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    const user = await loadMe()
    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context, user) } }
    }
    return { props: { user, data: { props: { user } } } }
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
