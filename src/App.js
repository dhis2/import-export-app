import { hot } from 'react-hot-loader'
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { api } from 'services'
import { Loading } from 'components'
import { setUser, clearUser } from 'reducers'
import Template from 'pages/Template'

import * as pages from './pages'
import { Route, withRouter } from 'react-router-dom'

@withRouter
@connect(({ user }) => ({ user }), { setUser, clearUser })
class App extends React.Component {
  state = {
    loaded: false
  }

  setLoaded = loaded => this.setState({ loaded })

  async componentDidMount() {
    try {
      const res = await api.get('me')
      const lang = res.data.settings.keyUiLocale
      moment.locale(lang)
      this.props.setUser(res.data)
    } catch (e) {
      console.log('/api/me error')
      console.log(e)
      this.props.clearUser()
    }

    this.setLoaded(true)
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <Template>
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
      </Template>
    )
  }
}

export default hot(module)(App)
