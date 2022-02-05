import React from 'react'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={`m-2 w-full flex flex-nowrap flex-col justify-center content-center align-middle`}>
        <div className={`w-full ${CENTER_FLEX}`}>
          <label className="relative block w-1/2 m-2">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M6.5.5a5.98 5.98 0 0 1 4.243 1.758A5.982 5.982 0 0 1 12.5 6.5a5.98 5.98 0 0 1-1.758 4.243C9.572 11.914 8.036 12.5 6.5 12.5s-3.071-.586-4.243-1.757A5.982 5.982 0 0 1 .5 6.5c0-1.535.586-3.07 1.757-4.242A5.984 5.984 0 0 1 6.5.5zm4 10L15 15"
                  stroke="rgb(203 213 225)"
                  fill="none"
                />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
        {children}
      </div>
    </>
  )
}

export default MainLayout
