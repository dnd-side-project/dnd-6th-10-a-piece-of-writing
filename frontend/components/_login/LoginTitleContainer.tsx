import React from 'react'

import { useWindowSize } from 'react-use'
import styled from 'styled-components'

import LoginTitle from '@/components/_login/LoginTitle'

type Props = {}

const LoginTitleContainer: React.FC<Props> = ({}) => {
  const { width } = useWindowSize()

  return (
    <Container>
      <div style={{ left: width / 4 }} className={'absolute top-1/2 -translate-y-1/2 z-20'}>
        <LoginTitle />
      </div>
      <div style={{ height: '150%' }} className={'flex flex-col gap-5 flex-nowrap'}>
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
      </div>
      <div style={{ height: '150%' }} className={'flex flex-col gap-5 flex-nowrap pt-28'}>
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
      </div>
      <div style={{ height: '150%' }} className={'flex flex-col gap-5 flex-nowrap pt-56'}>
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
        <Rectangle />
      </div>
    </Container>
  )
}

export const Container = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
`

export const Rectangle = styled.div`
  width: 283px;
  height: 283px;
  background-color: #f2f2f2;
  z-index: -1;
`

export default LoginTitleContainer
