import React from 'react'
import styled from 'styled-components'
import { Button } from '@/components/button'
import useUploadImage from '@/hook/useUploadImage'
import ImageResizer from '@/components/ImageResizer'

type Props = {}

const ImageUploadModal: React.FC<Props> = ({}) => {
  const { image, imageInputRef, onImageChange, onClickImageButton, handleDrop } = useUploadImage()

  return (
    <Container>
      <ImageResizer />
      {/*<input*/}
      {/*  className={'hidden'}*/}
      {/*  ref={imageInputRef}*/}
      {/*  type={'file'}*/}
      {/*  id={'image-input'}*/}
      {/*  accept={'image/*'}*/}
      {/*  name={'file'}*/}
      {/*  onChange={onImageChange}*/}
      {/*/>*/}
      {/*<Dropzone onDrop={handleDrop} noClick noKeyboard>*/}
      {/*  {({ getRootProps, getInputProps }) => (*/}
      {/*    <div className={CENTER_FLEX} {...getRootProps()}>*/}
      {/*      <input {...getInputProps()} />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Dropzone>*/}
      <Button style={{ marginTop: '2.5rem' }} bgColor={'#b9b9b9'} color={'#fff'}>
        업로드
      </Button>
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
  z-index: 1;
`
