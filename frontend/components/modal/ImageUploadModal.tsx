import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@/components/button'
import ImageResizer from '@/components/ImageResizer'

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
      <ImageResizer setUploadButtonEnabled={setUploadButtonEnabled} />
      {uploadButtonEnabled && (
        <Button style={{ marginTop: '2.5rem' }} bgColor={'#b9b9b9'} color={'#fff'}>
          업로드
        </Button>
      )}
    </Container>
  )
}

export default ImageUploadModal

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 996px;
  height: 780px;
  margin: 176px 462px 128px 72px;
  border-radius: 13px;
  box-shadow: 0 8px 13px 5px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 3;
`
