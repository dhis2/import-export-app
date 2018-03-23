import { hot } from 'react-hot-loader'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { api } from 'services'
import { Loading } from 'components'
import { setUser, clearUser } from 'reducers'

import * as pages from './pages'
import { Route, withRouter } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

@withRouter
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

    return (
      <Container>
        {Object.keys(pages).map(k => {
          const page = pages[k]
          return (
            <Route
              key={`page-${k}`}
              path={page.path}
              exact={true}
              component={page}
            />
          )
        })}
      </Container>
    )
  }
}

export default hot(module)(App)
