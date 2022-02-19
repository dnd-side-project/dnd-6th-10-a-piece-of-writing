import React from 'react'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import Image from 'next/image'
import Slider, { Settings } from 'react-slick'

import { backgroundImagesAtom, selectedBackgroundImageIndexAtom } from '@/atom/post'
import CheckButton from '@/components/button/CheckButton'
import { ImageUploadButton } from '@/components/button/ImageUploadButton'
import { ImageCardMd } from '@/components/card/imageCard'

type Props = {
  onClickImageUploadButton: () => void
}

// const SamplePrevArrow = () => <Image src={'/menu_caret-big-left.svg'} width={24} height={24} />
// const SampleNextArrow = () => <Image src={'/menu_caret-big-right.svg'} width={24} height={24} />

const sliderSettings: Settings = {
  dots: false,
  className: 'slider',
  infinite: false,
  speed: 500,
  arrows: true,
  variableWidth: true,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
}

const BackgroundImageCarousel: React.FC<Props> = ({ onClickImageUploadButton }) => {
  const images = useAtomValue(backgroundImagesAtom)
  const [selectedIndex, setSelectedIndex] = useAtom(selectedBackgroundImageIndexAtom)

  return (
    <Slider {...sliderSettings}>
      <div className={'m-5 cursor-pointer'}>
        <ImageUploadButton onClick={onClickImageUploadButton} />
      </div>
      {images.map((image, i) => (
        <div className={'m-5'} key={`test_${i}`}>
          <ImageCardMd onClick={() => setSelectedIndex(i)}>
            {i === selectedIndex && (
              <div className={'flex absolute left-4 top-4 z-10'}>
                <CheckButton containerHeight={'24px'} containerWidth={'24px'} />
              </div>
            )}
            <Image className={'rounded-xl'} src={image.url} width={184} height={184} alt={`bgImage_${i}`} />
          </ImageCardMd>
        </div>
      ))}
    </Slider>
  )
}

export default BackgroundImageCarousel
