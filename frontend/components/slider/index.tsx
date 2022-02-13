import React from 'react'

import Slider from 'rc-slider'

import { CENTER_FLEX } from '@/styles/classNames'

type Props = {
  name: string
  min?: number
  max?: number
  step?: number | null
  value?: number
  setValue?: (num: number) => void
  className?: string
}

export const CropSlider: React.FC<Props> = ({
  min = 0,
  max = 500,
  step = undefined,
  name,
  value,
  setValue = (_) => {},
  className = `w-full ${CENTER_FLEX}`,
}) => {
  return (
    <div className={className}>
      <span>{name}</span>
      <div className={'w-48 m-3'}>
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            setValue(e)
          }}
          step={step}
        />
      </div>
    </div>
  )
}
