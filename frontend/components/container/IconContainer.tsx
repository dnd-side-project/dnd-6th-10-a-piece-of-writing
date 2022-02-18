import styled from 'styled-components'

interface IconContainerProps {
  width?: string
  height?: string
  color?: string
  bgColor?: string
  cursor?: string
  transparent?: boolean
}

export const IconContainer = styled.div`
  width: ${(props: IconContainerProps) => props.width ?? '32px'};
  height: ${(props: IconContainerProps) => props.height ?? '32px'};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${(props) => (props.transparent ? 'auto' : 'rgba(255, 255, 255, 0.7)')};
  cursor: pointer;
`
