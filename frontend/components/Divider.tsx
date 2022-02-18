import styled from 'styled-components'

interface PlainDividerProps {
  width?: string
}

export const PlainDivider = styled.div`
  width: ${(props: PlainDividerProps) => props.width ?? '100%'};
  height: 1px;
  flex-grow: 0;
  margin: 11px 0 12px;
  background-color: #d0d0d0;
`
