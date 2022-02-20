import React from 'react'

import Link from 'next/link'

import { FlexDiv } from '@/components/style/div/FlexDiv'

type Props = {
  title: string
  content: string
  href?: string
}

const DummyCard: React.FC<Props> = ({ title, content, href = '#' }) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`

  return (
    <FlexDiv>
      <Link href={href}>
        <a
          style={{ backgroundColor: randomColor }}
          className="h-36 w-72 group block max-w-xs rounded-lg p-6 bg-whitering-1 ring-slate-900/5 shadow-lg">
          <div className="flex items-center space-x-3">
            <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">{title}</h3>
          </div>
          <p className="text-slate-500 group-hover:text-white text-sm whitespace-pre-line">{content}</p>
        </a>
      </Link>
    </FlexDiv>
  )
}

export default DummyCard
