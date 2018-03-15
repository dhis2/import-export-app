import React from 'react'
import { hot } from 'react-hot-loader'
import { api } from 'services'


class App extends React.Component {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    try {
      const { data } = await api.get('me')
      this.setState({
        loaded: true,
        user: data
      })
    } catch(e) {
      this.setState({
        loaded: true,
        user: null
      })
    }
  }

  render() {
    console.log('user', this.state.user)
    return (
      <div>
        App
      </div>
    )
  }
}

export default hot(module)(App)
