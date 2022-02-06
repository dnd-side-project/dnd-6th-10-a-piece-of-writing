import React from 'react'
import styled from 'styled-components'

type Props = {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={`w-full flex flex-nowrap flex-col justify-center content-center align-middle`}>
        <MainBar>
          <div className="ml-40">글 한조각</div>
          <span className="inset-y-0 left-0 flex items-center pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M6.5.5a5.98 5.98 0 0 1 4.243 1.758A5.982 5.982 0 0 1 12.5 6.5a5.98 5.98 0 0 1-1.758 4.243C9.572 11.914 8.036 12.5 6.5 12.5s-3.071-.586-4.243-1.757A5.982 5.982 0 0 1 .5 6.5c0-1.535.586-3.07 1.757-4.242A5.984 5.984 0 0 1 6.5.5zm4 10L15 15"
                stroke="rgb(0,0,0)"
                fill="none"
              />
            </svg>
          </span>
        </MainBar>
        {children}
      </div>
    </>
  )
}

const MainBar = styled.div`
  display: flex;
  align-items: center;
  height: 74px;
  border-bottom: 1px solid #e8e8e8;
`

export default MainLayout
