import React from 'react'
import classNames from 'classnames/bind'
import styles from './button.module.scss'

const cx = classNames.bind(styles)

type Props = {
  border?: string
  color?: string
  className?: string
  children?: React.ReactNode
  height?: string
  onClick?: () => void
  radius?: string
  width?: string
}

export const Button: React.FC<Props> = ({
  className,
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
      className={cx('btn', className)}
      {...props}>
      {children}
    </button>
  )
}
