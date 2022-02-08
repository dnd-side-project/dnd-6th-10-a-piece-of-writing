import { useState } from 'react'

export const uesToggles = (array: any[], defaultIndex = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const onToggle = (index: number) => () => {
    setSelectedIndex(index)
  }
  const isSelectedIndex = (index: number) => index === selectedIndex

  return { selectedIndex, isSelectedIndex, onToggle }
}
