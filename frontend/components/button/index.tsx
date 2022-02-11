import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
  width?: string
  height?: string
  color?: string
  bgColor?: string
}

export const Button = styled.button`
  width: ${(props: ButtonProps) => props.width || '386px'};
  height: ${(props: ButtonProps) => props.height || '52px'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 13px;
  color:  ${(props: ButtonProps) => props.color || '#eaeaea'};
  background-color:  ${(props: ButtonProps) => props.bgColor || '#2c2c2c'};
}


`
