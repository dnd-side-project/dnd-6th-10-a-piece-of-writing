import styled from 'styled-components'

export const GrayInput = styled.input`
  width: ${(props) => props.width ?? '386px'};
  height: ${(props) => props.height ?? '52px'};
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-radius: 13px;
  border: solid 1px #a1a1a1;
`
