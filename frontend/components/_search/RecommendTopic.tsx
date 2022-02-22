import React from 'react'

import { Tag } from '@/components/carousel'

type Props = {}

const RecommendTopic: React.FC<Props> = ({}) => {
  return (
    <>
      <p className={'text-t24 font-medium mb-8'}>이런 토픽들은 어떠세요?</p>
      <div className={'flex flex-wrap gap-2'}>
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
        <Tag tagInfo={{ name: '토픽' }} onClick={() => {}} />
      </div>
    </>
  )
}

export default RecommendTopic
