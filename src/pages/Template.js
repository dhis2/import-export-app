import React from 'react'
import styled from 'styled-components'
import { SidePanel } from 'components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
const Content = styled.div``

export class Template extends React.Component {
  render() {
    return (
      <Container>
        <SidePanel />
        <Content>{this.props.children}</Content>
      </Container>
    )
  }
}
