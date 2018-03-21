import { hot } from 'react-hot-loader'
import React from 'react'
import styled from 'styled-components'
import { api } from 'services'
import { Loading } from 'components'

const Container = styled.div`
  width: 100%;
  margin: 20px;
`

class App extends React.Component {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    try {
      const { data, status } = await api.get('me')

      if (status === 200) {
        this.setState({
          loaded: true,
          user: data,
        })
      } else {
        this.setState({
          loaded: true,
          user: null,
        })
      }
    } catch (e) {
      this.setState({
        loaded: true,
        user: null,
      })
    }
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { user } = this.state
    console.log('user', user)
    return <Container>App</Container>
  }
}

export default hot(module)(App)
