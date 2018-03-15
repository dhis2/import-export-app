import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

const Todo = styled.pre`
  margin: 20px auto 20px auto;
  width: 50%;
  white-space: pre-wrap;
  font-size: 18px;
`


class App extends React.Component {
  render() {
    return (
      <div>
        <Todo>{`
TODO

1. Authenticate
2. Accumulate REST endpoints
`}</Todo>
      </div>
    )
  }
}

export default hot(module)(App)
