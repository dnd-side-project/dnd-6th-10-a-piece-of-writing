import React from 'react'

import Image from 'next/image'
import Avatar from 'react-avatar'
import styled from 'styled-components'

import EditButton from '@/components/button/EditButton'

type Props = {
  imgSrc?: string
  width?: string
  nickname?: string
  editable?: boolean
  onClickEdit?: () => {}
}

const ProfileImageCard: React.FC<Props> = ({
  width = '120px',
  imgSrc,
  nickname = '유저',
  editable = false,
  onClickEdit,
}) => {
  return (
    <Container>
      {imgSrc ? (
        <Image src={imgSrc} width={width} height={width} />
      ) : (
        <Avatar value={nickname} round={true} size={width} />
      )}
      {editable && (
        <EditButtonContainer onClick={onClickEdit}>
          <EditButton transparent={true} />
        </EditButtonContainer>
      )}
    </Container>
  )
}

interface ContainerProps {
  width?: string
  height?: string
}

const Container = styled.div`
  position: relative;
  width: ${(props: ContainerProps) => props.width ?? '120px'};
  height: ${(props: ContainerProps) => props.width ?? '120px'};
  border-radius: 50%;
`

const EditButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 7px;
  cursor: pointer;
`

export default ProfileImageCard
