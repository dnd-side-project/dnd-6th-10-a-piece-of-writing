import React, { useEffect, useState } from 'react'

import { useWindowSize } from 'react-use'

import LoginForm from '@/components/_login/LoginForm'
import LoginTitleContainer from '@/components/_login/LoginTitleContainer'
import useAlreadyLogin from '@/hook/useAlreadyLogin'
import { useSsrMe } from '@/hook/useSsrMe'
import { withAuthServerSideProps } from '@/server/withAuthServerSide'
import { CENTER_FLEX } from '@/styles/classNames'
import { UserInfo as UserInfoType } from '@/type/user'

type ServerSideProps = { me: UserInfoType }

const Login: React.FC<ServerSideProps> = ({ me }) => {
  useSsrMe(me)
  useAlreadyLogin()
  const [_width, setWidth] = useState(0)
  const { width } = useWindowSize()
  const big = _width > 984

  useEffect(() => {
    setWidth(width)
  }, [width])

  return big ? (
    <div className={`w-full h-screen ${CENTER_FLEX}`}>
      <div className={'flex w-3/5 h-[150%] overflow-hidden'}>
        <LoginTitleContainer />
      </div>
      <div className={`flex w-2/5 ${CENTER_FLEX}`}>
        <LoginForm big={big} />
      </div>
    </div>
  ) : (
    <div className={`w-full h-screen ${CENTER_FLEX}`}>
      <LoginForm big={big} />
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps()

export default Login
