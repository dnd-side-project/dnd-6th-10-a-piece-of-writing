import React from 'react'
import { CENTER_FLEX } from '@/styles/classNames'

type Props = {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={`m-2 w-full ${CENTER_FLEX}`}>
        <label className="relative block w-1/2">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="h-5 w-5 fill-slate-300"
              viewBox="0 0 20 20"
              xmlBase={
                'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzkyOTI5MiIgaWQ9Imljb24tMTExLXNlYXJjaCI+PHBhdGggZD0iTTE5LjQyNzExNjQsMjAuNDI3MTE2NCBDMTguMDM3MjQ5NSwyMS40MTc0ODAzIDE2LjMzNjY1MjIsMjIgMTQuNSwyMiBDOS44MDU1NzkzOSwyMiA2LDE4LjE5NDQyMDYgNiwxMy41IEM2LDguODA1NTc5MzkgOS44MDU1NzkzOSw1IDE0LjUsNSBDMTkuMTk0NDIwNiw1IDIzLDguODA1NTc5MzkgMjMsMTMuNSBDMjMsMTUuODQ3MjEwMyAyMi4wNDg2MDUyLDE3Ljk3MjIxMDMgMjAuNTEwNDA3NywxOS41MTA0MDc3IEwyNi41MDc3NzM2LDI1LjUwNzc3MzYgQzI2Ljc4MjgyOCwyNS43ODI4MjggMjYuNzc2MTQyNCwyNi4yMjM4NTc2IDI2LjUsMjYuNSBDMjYuMjIxOTMyNCwyNi43NzgwNjc2IDI1Ljc3OTYyMjcsMjYuNzc5NjIyNyAyNS41MDc3NzM2LDI2LjUwNzc3MzYgTDE5LjQyNzExNjQsMjAuNDI3MTE2NCBMMTkuNDI3MTE2NCwyMC40MjcxMTY0IFogTTE0LjUsMjEgQzE4LjY0MjEzNTgsMjEgMjIsMTcuNjQyMTM1OCAyMiwxMy41IEMyMiw5LjM1Nzg2NDE3IDE4LjY0MjEzNTgsNiAxNC41LDYgQzEwLjM1Nzg2NDIsNiA3LDkuMzU3ODY0MTcgNywxMy41IEM3LDE3LjY0MjEzNTggMTAuMzU3ODY0MiwyMSAxNC41LDIxIEwxNC41LDIxIFoiIGlkPSJzZWFyY2giLz48L2c+PC9nPjwvc3ZnPg=='
              }></svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
        </label>
        {children}
      </div>
    </>
  )
}

export default MainLayout
