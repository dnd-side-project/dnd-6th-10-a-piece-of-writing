import React, { useRef, useState } from 'react'

import { CENTER_FLEX } from '@/styles/classNames'
import classNames from 'classnames/bind'
import styles from './upload.module.scss'
import 'rc-slider/assets/index.css'

import AvatarEditor from 'react-avatar-editor'
import { Button } from '@/components/button'
import { CropSlider } from '@/pages/image/useAvatarEditor'

const cx = classNames.bind(styles)

const crop = () => {
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(250)
  const [height, setHeight] = useState(250)
  const [rotate, setRotate] = useState(0)
  const [text, setText] = useState('')

  const [resultImageUrl, setResultImageUrl] = useState('')

  const editorRef = useRef<AvatarEditor>()

  const onClickTest = () => {
    if (!editorRef.current) return
    const canvas = editorRef.current.getImage().toDataURL()
    fetch(canvas)
      .then((res) => res.blob())
      .then((blob) => setResultImageUrl(window.URL.createObjectURL(blob)))
  }

  return (
    <div className={cx('w-full', 'min-h-screen', CENTER_FLEX, 'flex-col')}>
      <div className={cx('flex-col', CENTER_FLEX)}>
        <AvatarEditor
          ref={(editor) => {
            editor && (editorRef.current = editor)
          }}
          crossOrigin={'anonymous'}
          image="https://fakeimg.pl/1000/"
          width={width}
          height={height}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={zoom}
          rotate={rotate}
        />
      </div>
      <div className={cx('w-full', CENTER_FLEX, 'flex-col')}>
        <CropSlider value={width} setValue={setWidth} name={'width'} />
        <CropSlider value={height} setValue={setHeight} name={'height'} />
        <CropSlider value={zoom} setValue={setZoom} name={'zoom'} max={2} step={0.01} />
        <CropSlider value={rotate} setValue={setRotate} name={'rotate'} max={360} step={1} />
        <textarea
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="내용을 입력하세요.."
          name="search"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
      </div>

      <Button onClick={onClickTest}>테스트</Button>
      <div className={'w-52 h-52'}>
        <div
          className={'w-full h-0'}
          style={{
            backgroundImage: `url(${resultImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingTop: '100%',
          }}>
          <span>{text}</span>
        </div>
      </div>
      {/*<div className={'flex w-40 h-40'}>*/}
      {/*  <img className={'max-w-full max-h-full'} src={resultImageUrl} />*/}
      {/*  <div className={'w-full inset-2/4'}>{text}</div>*/}
      {/*</div>*/}
    </div>
  )
}

export default crop
