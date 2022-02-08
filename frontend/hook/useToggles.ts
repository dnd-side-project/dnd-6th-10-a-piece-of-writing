import { useSet } from 'react-use'
import { useMemo } from 'react'

export const uesToggles = (array: any[], defaultIndexes = [0]) => {
  const [selectedIndexesSet, { has, toggle, reset }] = useSet(new Set(defaultIndexes))

  const selectedIndexes = useMemo(() => {
    return Array.from(selectedIndexesSet)
  }, [selectedIndexesSet, selectedIndexesSet.size])

  const onToggle = (index: number) => () => {
    toggle(index)
  }
  const isSelectedIndex = (index: number) => has(index)

  return { selectedIndex: selectedIndexes, selectedIndexes, isSelectedIndex, onToggle, reset }
}
