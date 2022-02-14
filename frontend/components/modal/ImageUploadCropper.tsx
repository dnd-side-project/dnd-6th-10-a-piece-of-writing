import React, { useRef, useState } from 'react'

import { useUpdateAtom } from 'jotai/utils'
import { Cropper } from 'react-cropper'
import styled from 'styled-components'

import { addedImagesAtom, isUploadModalOpenAtom, selectedBackgroundImageIndexAtom } from '@/atom/post'
import { Button } from '@/components/button'

type ImageSrc = string

type Props = {
  originImage: ImageSrc
  setOriginImage: React.Dispatch<React.SetStateAction<string>>
}

export const ImageUploadCropper = ({ originImage, setOriginImage }: Props) => {
  const [src, setSrc] = useState(originImage)
  const setImages = useUpdateAtom(addedImagesAtom)
  const setIsUploadModalOpen = useUpdateAtom(isUploadModalOpenAtom)
  const setSelectedBackgroundImageIndex = useUpdateAtom(selectedBackgroundImageIndexAtom)

  const [cropResult, setCropResult] = useState('')

  const cropperRef = useRef<any>(null)

  const cropImage = () => {
    const croppedData = cropperRef.current?.cropper.getCroppedCanvas()
    if (croppedData === 'undefined') {
      return
    }
    croppedData?.toBlob((blob: Blob) => {
      setCropResult(croppedData?.toDataURL())
      setImages((_images) => [..._images, { url: croppedData.toDataURL(), blob }])
      setIsUploadModalOpen(false)
      setSelectedBackgroundImageIndex((index) => index + 1)
    })
  }

  const useDefaultImage = () => {
    setSrc(originImage)
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <button onClick={useDefaultImage}>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: '100%' }}
          aspectRatio={1}
          guides={false}
          cropBoxResizable={false}
          zoomable={false}
          background={false}
          zoomOnWheel={false}
          dragMode={'move'}
          src={src}
          ref={cropperRef}
        />
      </div>
      <ButtonContainerDiv>
        <_Button bgColor={'#313552'} onClick={() => setOriginImage('')}>
          뒤로가기
        </_Button>
        <_Button onClick={cropImage}>이렇게 잘라 사용하기</_Button>
      </ButtonContainerDiv>
      <img src={cropResult} />
    </div>
  )
}

const ButtonContainerDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.8rem;
`

const _Button = styled(Button)`
  width: 40%;
`
