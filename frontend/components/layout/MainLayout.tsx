import React from 'react'

import { useAtomValue } from 'jotai/utils'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { meAtom } from '@/atom/user/me'

type Props = {}

const MainLayout: React.FC<Props> = ({ children }) => {
  const me = useAtomValue(meAtom)

  return (
    <>
      <div className={`w-full flex flex-nowrap flex-col justify-center content-center align-middle`}>
        <MainBar>
          <div className={'flex ml-4 justify-center'}>
            <Link href={'/'}>
              <Image className={'cursor-pointer'} src={'/logo_vertical.svg'} width={84} height={22} />
            </Link>
          </div>
          <div> </div>
          <div> </div>
          <div className={`flex gap-4`}>
            <div className={'flex cursor-pointer'}>
              <Link href={`/search`}>
                <Image src={'/menu_search.svg'} width={24} height={24} />
              </Link>
            </div>
            {me?.id && (
              <div className={'flex cursor-pointer'}>
                <Link href={`/user/${me?.id}`}>
                  <Image src={'/profile.svg'} width={24} height={24} />
                </Link>
              </div>
            )}
          </div>
        </MainBar>
        {children}
      </div>
    </>
  )
}

const MainBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;
  height: 74px;
  border-bottom: 1px solid #e8e8e8;
  z-index: 20;
`

export default MainLayout
