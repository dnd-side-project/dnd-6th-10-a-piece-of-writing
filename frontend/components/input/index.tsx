import React from 'react'
import classNames from 'classnames/bind'
import styles from './input.module.scss'

const cx = classNames.bind(styles)

export const Input = ({ ...props }) => {
  return <input className={cx('text-field')} {...props} />
}
