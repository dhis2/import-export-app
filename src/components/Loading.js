import React from 'react'
import { CircularProgress } from 'material-ui'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 50px 0;
  text-align: center;
`

export function Loading({ size, thickness }) {
  return (
    <Container>
      <CircularProgress size={size || 80} thickness={thickness || 1} />
    </Container>
  )
}
