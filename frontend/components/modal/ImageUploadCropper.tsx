import React, { useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import { Button } from '@/components/button'
import styled from 'styled-components'

type ImageSrc = string

type Props = {
  originImage: ImageSrc
  setOriginImage: React.Dispatch<React.SetStateAction<string>>
}

export const ImageUploadCropper = ({ originImage, setOriginImage }: Props) => {
  const [src, setSrc] = useState(originImage)
  const [images, setImages] = useState<string[]>([])
  const [cropResult, setCropResult] = useState('')

  const cropperRef = useRef<any>(null)

  console.log({ cropperRef: cropperRef.current })

  const cropImage = () => {
    if (typeof cropperRef.current?.getCroppedCanvas() === 'undefined') {
      return
    }
    setCropResult(cropperRef.current?.getCroppedCanvas().toDataURL())
    setImages((images) => [...images, cropperRef.current.getCroppedCanvas().toDataURL()])
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
          ref={(cropper: any) => {
            cropperRef.current = cropper.cropper
          }}
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
