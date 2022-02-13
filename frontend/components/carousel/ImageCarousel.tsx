import React from 'react'

import Slider, { Settings } from 'react-slick'

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

const ImageCarousel: React.FC<Props> = ({ onClickImageUploadButton }) => {
  return (
    <Slider {...sliderSettings}>
      {new Array(5).fill(undefined).map((_, i) => (
        <div className={'m-5'} key={`test_${i}`}>
          <ImageCardMd>
            <h3>{i}</h3>
          </ImageCardMd>
        </div>
      ))}
      <div className={'m-5'}>
        <ImageUploadButton onClick={onClickImageUploadButton} />
      </div>
    </Slider>
  )
}

export default ImageCarousel
