import styled from 'styled-components'

interface ButtonProps {
  width?: string
  height?: string
  color?: string
  bgColor?: string
  cursor?: string
}

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color:  ${(props: ButtonProps) => props.color ?? '#eaeaea'};
  border-radius: 13px;
  background-color:  ${(props: ButtonProps) => props.bgColor ?? '#2c2c2c'};
  cursor: ${(props: ButtonProps) => props.cursor ?? 'pointer'};
  width: 80%;
  height: ${(props: ButtonProps) => props.height ?? '52px'};
  @media screen and (min-width: 500px) {
    width: ${(props: ButtonProps) => props.width ?? '386px'};
  }
}


`
