import React, { useRef, useState } from 'react'

import classNames from 'classnames/bind'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

import { Button } from '@/components/button'
import { ImageUploadButton } from '@/components/button/ImageUploadButton'
import { ImageUploadCropper } from '@/components/modal/ImageUploadCropper'
import { CropSlider } from '@/components/slider'
import { CENTER_FLEX } from '@/styles/classNames'

const cx = classNames.bind({})

type Props = {
  setUploadButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageResizer = ({ setUploadButtonEnabled }: Props) => {
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(250)
  const [height, setHeight] = useState(250)
  const [rotate, setRotate] = useState(0)
  const [image, setImage] = useState<File | string>('')
  const [resultImageUrl, setResultImageUrl] = useState('')

  const imageExist = image !== ''
  const resultImageUrlExist = resultImageUrl !== ''

  const editorRef = useRef<AvatarEditor>()
  const imageInputRef = useRef<HTMLInputElement>(null)
  // const resultImageRef = useRef<HTMLImageElement>(null)

  const onClickResize = () => {
    if (!editorRef.current) return
    const canvas = editorRef.current.getImage().toDataURL()
    fetch(canvas)
      .then((res) => res.blob())
      .then((blob) => setResultImageUrl(window.URL.createObjectURL(blob)))
  }

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imageFiles = e.currentTarget.files
    imageFiles?.[0] && setImage(imageFiles[0])
  }

  const onClickImageButton = (e: React.MouseEvent) => {
    e.preventDefault()
    imageInputRef?.current?.click()
  }

  const handleDrop = (dropped: File[]) => {
    setImage(dropped[0])
  }
  return (
    <>
      {image === '' && (
        <ImageUploadButton width={'386px'} height={'386px'} showExplain={true} onClick={onClickImageButton} />
      )}
      <input
        className={'hidden'}
        ref={imageInputRef}
        type={'file'}
        id={'image-input'}
        accept={'image/*'}
        name={'file'}
        onChange={onImageChange}
      />
      <Dropzone onDrop={handleDrop} noClick noKeyboard>
        {({ getRootProps, getInputProps }) => (
          <div className={cx('flex-col', CENTER_FLEX)} {...getRootProps()}>
            {imageExist && !resultImageUrlExist && (
              <AvatarEditor
                ref={(editor) => {
                  editor && (editorRef.current = editor)
                }}
                crossOrigin={'anonymous'}
                image={image}
                width={width}
                height={height}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={zoom}
                rotate={rotate}
              />
            )}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {imageExist && !resultImageUrlExist && (
        <>
          <div className={cx('w-full', CENTER_FLEX, 'flex-col')}>
            <CropSlider value={width} setValue={setWidth} name={'width'} />
            <CropSlider value={height} setValue={setHeight} name={'height'} />
            <CropSlider value={zoom} setValue={setZoom} name={'zoom'} max={2} step={0.01} />
            <CropSlider value={rotate} setValue={setRotate} name={'rotate'} max={360} step={1} />
          </div>
          <Button className={'mt-2'} onClick={onClickResize}>
            선택
          </Button>
        </>
      )}
      {resultImageUrlExist && <ImageUploadCropper setOriginImage={setResultImageUrl} originImage={resultImageUrl} />}
    </>
  )
}

export default ImageResizer
