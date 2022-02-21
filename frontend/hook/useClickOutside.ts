import { useEffect } from 'react'

type Props = {
  ref: any
  func: Function
}

export const useClickOutside = ({ ref, func }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event?.target)) {
        func()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
