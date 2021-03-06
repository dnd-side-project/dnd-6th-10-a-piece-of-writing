import { useCallback, useMemo } from 'react'

import { useSet } from 'react-use'

type Props = {
  defaultIndexes: number[]
  singleMode?: boolean // 1개만 선택가능한 토글일 때
}

export const useToggles = (props: Props) => {
  const { singleMode = true, defaultIndexes } = props
  const [selectedIndexesSet, { has, remove, toggle, reset }] = useSet(new Set(defaultIndexes))

  const selectedIndexes = useMemo(() => {
    return Array.from(selectedIndexesSet)
  }, [selectedIndexesSet, selectedIndexesSet?.size])

  const onToggle = (index: number) => () => {
    if (singleMode) {
      reset()
      remove(defaultIndexes[0])
      toggle(index)
      return
    }
    toggle(index)
  }
  const isSelectedIndex = useCallback((index: number) => has(index), [selectedIndexesSet, has])

  return { selectedIndex: selectedIndexes[0], selectedIndexes, isSelectedIndex, onToggle, reset }
}
