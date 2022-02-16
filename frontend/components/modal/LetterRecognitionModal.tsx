import React, { useEffect, useRef, useState } from 'react'

import { useUpdateAtom } from 'jotai/utils'
import Image from 'next/image'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

import { isRecognitionModalOpenAtom, postTextAtom } from '@/atom/post'
import { Button } from '@/components/button'
import { ImageUploadButton } from '@/components/button/ImageUploadButton'
import { FlexDiv } from '@/components/style/div/FlexDiv'
import { extractImage } from '@/server/post/image'
import { BreakPoints } from '@/styles/breakPoint'

type Props = {}

const LetterRecognitionModal: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | string>('')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const setPostText = useUpdateAtom(postTextAtom)
  const setIsModalOpen = useUpdateAtom(isRecognitionModalOpenAtom)

  const uploadButtonEnabled = image !== '' && previewUrl !== ''

  const containerRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

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

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imageFile = e.currentTarget.files?.[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    imageFile && setImage(imageFile)
    imageFile && reader.readAsDataURL(imageFile)
  }

  const onClickImageButton = (e: React.MouseEvent) => {
    e.preventDefault()
    imageInputRef?.current?.click()
  }

  const onClickExtractButton = () => {
    if (!confirm('변환하게 되면 기존에 입력했던 텍스트는 사라집니다. 계속 진행하시겠습니까?')) return
    const formData = new FormData()
    formData.append('file', image)
    setLoading(true)
    void extractImage(formData).then((res) => {
      res.data && setPostText(res.data)
      setIsModalOpen(false)
      setLoading(false)
    })
  }

  return (
    <Container ref={containerRef}>
      {loading ? (
        <FlexDiv height={'490px'}>
          <Oval />
        </FlexDiv>
      ) : (
        <>
          <CloseButton
            onClick={() => {
              setIsModalOpen(false)
            }}>
            <Image src={'/close.svg'} width={24} height={24} />
          </CloseButton>
          <FlexDiv margin={'3.5rem 0'}>
            <p className={'text-link mb-auto md:text-h3 mx-5'}>사진 속 글자를 인식해서 업로드됩니다!</p>
          </FlexDiv>
          <FlexDiv direction={'column'} height={'90%'}>
            {image === '' ? (
              <ImageUploadButton
                width={'386px'}
                height={'386px'}
                showExplain={true}
                onClick={onClickImageButton}
                isDragAndDropAble={false}
              />
            ) : (
              <img src={previewUrl ?? ''} />
            )}
            <input
              className={'hidden'}
              ref={imageInputRef}
              type={'file'}
              id={'image-input'}
              accept={'image/*'}
              name={'file'}
              multiple={false}
              onChange={onImageChange}
            />
            <Button
              style={{ marginTop: '2.5rem' }}
              color={'#fff'}
              bgColor={uploadButtonEnabled ? '#2c2c2c' : '#b9b9b9'}
              cursor={uploadButtonEnabled ? 'pointer' : 'auto'}
              onClick={onClickExtractButton}>
              변환하기
            </Button>
          </FlexDiv>
        </>
      )}
    </Container>
  )
}

export default LetterRecognitionModal

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`

const Container = styled.div`
  position: absolute;
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
  @media screen and (min-width: ${BreakPoints.md}) {
    min-height: 780px;
    margin-top: 176px;
  }
`
