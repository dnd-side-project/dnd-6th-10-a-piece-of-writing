import React from 'react'
import styled from 'styled-components'

interface BlackButtonProps {
  width?: string
  height?: string
}

export const BlackButton = styled.button`
  width: ${(props: BlackButtonProps) => props.width || '386px'};
  height: ${(props: BlackButtonProps) => props.height || '52px'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 101px;
  border-radius: 13px;
  background-color: #2c2c2c;
}


`
