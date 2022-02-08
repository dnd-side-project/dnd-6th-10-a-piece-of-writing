import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type Props = {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={`w-full flex flex-nowrap flex-col justify-center content-center align-middle`}>
        <MainBar>
          <Image src={'/logo_vertical.svg'} width={84} height={22} />
          <div> </div>
          <div> </div>
          <div className={`flex gap-4`}>
            <Image src={'/menu_search.svg'} width={24} height={24} />
            <Image src={'/profile_profile.svg'} width={24} height={24} />
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
`

export default MainLayout
