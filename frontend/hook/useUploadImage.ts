import React, { useRef, useState } from 'react'

type Props = {}

const useUploadImage = () => {
  const [image, setImage] = useState<File | string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)
  console.log({ image })

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
    console.log(dropped)
    setImage(dropped[0])
  }

  return {
    image,
    handleDrop,
    imageInputRef,
    onImageChange,
    onClickImageButton,
  }
}

export default useUploadImage
