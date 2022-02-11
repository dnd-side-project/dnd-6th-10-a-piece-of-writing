import React from 'react'

import Slider, { Settings } from 'react-slick'

import { ImageCardSm } from '@/components/card/imageCard'

export default function SimpleSlider() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    variableWidth: true,
  }
  return (
    <div>
      <Slider {...settings}>
        {new Array(10).fill(undefined).map((_, i) => (
          <div className={'m-5'} key={`test_${i}`}>
            <ImageCardSm>
              <h3>{i}</h3>
            </ImageCardSm>
          </div>
        ))}
      </Slider>
    </div>
  )
}
