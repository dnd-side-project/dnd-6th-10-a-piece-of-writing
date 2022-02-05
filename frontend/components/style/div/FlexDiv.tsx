import React from 'react'

type Props = {}

const FlexDiv: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-wrap justify-center content-center">{children}</div>
}

export default FlexDiv
