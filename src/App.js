import { hot } from 'react-hot-loader'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { api } from 'services'
import { Loading } from 'components'
import { setUser, clearUser } from 'reducers'

const Container = styled.div`
  width: 100%;
  margin: 20px;
`

@connect(({ user }) => ({ user }), { setUser, clearUser })
class App extends React.Component {
  state = {
    loaded: false,
  }

  setLoaded = loaded => this.setState({ loaded })

  async componentDidMount() {
    try {
      const res = await api.get('me')
      const contentType = res.headers['content-type']
      if (
        contentType.startsWith('application/json') &&
        Object.keys(res.data).length > 0
      ) {
        this.props.setUser(res.data)
      } else {
        this.props.clearUser()
      }
    } catch (e) {
      this.props.clearUser()
    }

    this.setLoaded(true)
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />
    }

    console.log('user', this.props.user)
    return <Container>App</Container>
  }
}

export default hot(module)(App)
