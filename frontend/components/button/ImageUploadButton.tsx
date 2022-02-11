import React from 'react'

import classNames from 'classnames/bind'
import Image from 'next/image'
import styled from 'styled-components'

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  width?: string
  height?: string
  showExplain?: boolean
}
const cx = classNames.bind({})

export const ImageUploadButton = ({ onClick, width = '184px', height = '184px', showExplain = false }: Props) => {
  return (
    <ImageUploadContainer width={width} height={height} onClick={onClick}>
      <div className={cx(showExplain && 'mt-10')}>
        <Image src={'/post_upload.svg'} width={25} height={25} />
      </div>
      {showExplain && <ExplainContainer>드래그 앤 드랍 혹은 클릭</ExplainContainer>}
    </ImageUploadContainer>
  )
}

interface ImageUploadContainerProps {
  width?: string
  height?: string
}

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${(props: ImageUploadContainerProps) => props.width || '184px'};
  height: ${(props: ImageUploadContainerProps) => props.height || '184px'};
  border-radius: 13px;
  border: dashed 2px #2c2c2c;
`

const ExplainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #737373;
  border-radius: 13px;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: dashed 1px #b9b9b9;
  cursor: pointer;
`
