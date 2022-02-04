import React, { useRef } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import dynamic from 'next/dynamic'

import { CENTER_FLEX } from '@/styles/classNames'
import classNames from 'classnames/bind'
import styles from './upload.module.scss'
import { Button } from '@/components/button'
// @ts-ignore
const ImageEditor: any = dynamic(() => import('@toast-ui/react-image-editor'))

const ForwardedRefImageEditor: any = React.forwardRef((props, ref) => <ImageEditor {...props} forwardedRef={ref} />)

const cx = classNames.bind(styles)

const upload = ({}) => {
  const editorRef = useRef()

  const onCLickTest = () => {
    // const instance = editorRef?.current?.getInstance()
    // console.log({ editorRef })
    // console.log({ current: editorRef?.current })
    // console.log({ instance })
    // console.log(instance.getCanvasSize())
  }

  return (
    <div className={cx('w-full', 'h-screen', 'flex-col', CENTER_FLEX)}>
      <ForwardedRefImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: 'https://fakeimg.pl/300/',
            name: 'SampleImage',
          },
          menu: ['shape', 'filter'],
          initMenu: 'filter',
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={400}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
      <Button onClick={onCLickTest}>테스트</Button>
    </div>
  )
}

export default upload
