import React from 'react'
import classNames from 'classnames/bind'
import styles from './button.module.scss'

const cx = classNames.bind(styles)

type Props = {
  className?: string
}

export const Button: React.FC<Props> = ({ className, ...props }) => {
  return <button className={cx('btn', className)} {...props} />
}
