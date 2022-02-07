import React, { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { CENTER_FLEX } from '@/styles/classNames'
import AvatarEditor from 'react-avatar-editor'
import { CropSlider } from '@/components/slider'
import classNames from 'classnames/bind'
import { ImageUploadButton } from '@/components/button/ImageUploadButton'

const cx = classNames.bind({})

const ImageResizer = () => {
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(250)
  const [height, setHeight] = useState(250)
  const [rotate, setRotate] = useState(0)
  const [image, setImage] = useState<File | string>('')
  const [resultImageUrl, setResultImageUrl] = useState('')

  const imageExist = image !== ''

  const editorRef = useRef<AvatarEditor>()
  const imageInputRef = useRef<HTMLInputElement>(null)

  const onClickTest = () => {
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
            {imageExist && (
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
      {imageExist && (
        <>
          <div className={cx('w-full', CENTER_FLEX, 'flex-col')}>
            <CropSlider value={width} setValue={setWidth} name={'width'} />
            <CropSlider value={height} setValue={setHeight} name={'height'} />
            <CropSlider value={zoom} setValue={setZoom} name={'zoom'} max={2} step={0.01} />
            <CropSlider value={rotate} setValue={setRotate} name={'rotate'} max={360} step={1} />
          </div>
        </>
      )}
    </>
  )
}

export default ImageResizer
