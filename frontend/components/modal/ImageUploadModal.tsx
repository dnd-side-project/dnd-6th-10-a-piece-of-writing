import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { Button } from '@/components/button'
import ImageResizer from '@/components/ImageResizer'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { BreakPoints } from '@/styles/breakPoint'

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageUploadModal: React.FC<Props> = ({ setIsModalOpen }) => {
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef?.current?.contains(event?.target)) {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef])

  return (
    <Container ref={containerRef}>
      <FlexDiv>
        <ImageResizer setUploadButtonEnabled={setUploadButtonEnabled} />
        {uploadButtonEnabled && (
          <Button style={{ marginTop: '2.5rem' }} bgColor={'#b9b9b9'} color={'#fff'}>
            업로드
          </Button>
        )}
      </FlexDiv>
    </Container>
  )
}

export default ImageUploadModal

const Container = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 996px;
  width: 90%;
  margin-top: 100px;
  border-radius: 13px;
  box-shadow: 0 8px 13px 5px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 3;
  min-height: 480px;
  padding: 2rem;
  @media screen and (min-width: ${BreakPoints.md}) {
    min-height: 780px;
    margin-top: 176px;
  }
`
