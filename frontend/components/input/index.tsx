import styled from 'styled-components'

export const GrayInput = styled.input`
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

  width: ${(props) => props.width ?? '100%'};
  @media screen and (min-width: 500px) {
    width: ${(props) => props.width ?? '386px'};
  }
`
