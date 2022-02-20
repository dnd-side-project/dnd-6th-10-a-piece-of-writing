import styled from 'styled-components'

export type MenuModalContainerProps = {
  top?: string
  right?: string
  width?: string
}

export const MenuModalContainer = styled.div`
  position: absolute;
  top: ${(props: MenuModalContainerProps) => props.top ?? '24px'};
  width: ${(props: MenuModalContainerProps) => props.width ?? '228px'};
  right: ${(props: MenuModalContainerProps) => props.right ?? '-204px'};
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  transition: opacity 0.5s;
  font-size: 14px;
`
