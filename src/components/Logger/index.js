import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { eventEmitter } from 'services'
import s from './styles.css'
import moment from 'moment/moment'

const iconProps = {
  width: 32,
  height: 32,
  fill: '#fff'
}

function ArrowUpIcon({ onClick }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} onClick={onClick}>
      <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3" />
        <path fill="none" d="M0,0h24v24H0V0z" />
      </g>
      <g id="Outline">
        <g id="ui_x5F_spec_x5F_header" />
        <path d="M7.41,15.41L12,10.83l4.59,4.58L18,14l-6-6l-6,6L7.41,15.41z" />
      </g>
    </svg>
  )
}

function ArrowDownIcon({ onClick }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} onClick={onClick}>
      <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3" />
        <path fill="none" d="M0,0h24v24H0V0z" />
      </g>
      <g id="Outline">
        <g id="ui_x5F_spec_x5F_header" />
        <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
      </g>
    </svg>
  )
}

function Message({ d, type, text }) {
  return (
    <div className={s.message}>
      <div className={s.date}>{moment(d).format('YYYY-MM-DD HH:mm:ss')}</div>
      <div className={s.type}>{type}</div>
      <div className={s.contents}>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  )
}

export class Logger extends React.Component {
  state = {
    open: false,
    height: 250,
    list: []
  }

  componentDidMount() {
    this.appContent = document.getElementById('import-export-app-content')
    eventEmitter.on('log', this.onMessage)
    eventEmitter.on('log.open', this.onOpen)
    eventEmitter.on('log.close', this.onClose)
  }

  componentWillUnmount() {
    this.appContent = null
    this.elmMessages = null
    eventEmitter.off('log', this.onMessage)
    eventEmitter.off('log.open', this.onOpen)
    eventEmitter.off('log.close', this.onClose)
  }

  onMessage = msg => {
    const { list } = this.state
    if (list.filter(m => m.id === msg.id).length > 0) {
      return
    }

    const updated = list.slice(0)
    updated.push(msg)
    this.setState({ list: updated }, this.scrollToBottom)
  }

  scrollToBottom() {
    if (!this.elmMessages) {
      return
    }

    this.elmMessages.scrollTop = this.elmMessages.scrollHeight
  }

  onOpen = () => {
    this.clearSelection()
    const { height } = this.state
    this.setState({ open: true, height: height > 0 ? height : 250 }, () => {
      let { height } = this.state
      this.elmMessages.style.height = `${height}px`
      this.appContent.style.height = `calc(100vh - ${height}px)`
      this.scrollToBottom()
    })
  }

  onClose = () => {
    this.setState({ open: false })
    this.appContent.style.height = '100vh'
  }

  clearSelection = () => {
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  }

  onDragStart = () => this.clearSelection()
  onDragEnd = () => this.clearSelection()
  onClick = () => this.clearSelection()

  onDrag = evt => {
    const { screenY } = evt

    if (screenY > 0) {
      let height = window.innerHeight - screenY + 80
      this.elmMessages.style.height = `${height}px`
      this.appContent.style.height = `calc(100vh - ${height}px)`

      if (!this.state.open) {
        this.setState({
          height,
          open: true
        })
        return
      }

      this.setState({ height })
    }
  }

  onDoubleClick = () => {
    if (!this.state.open) {
      this.onOpen()
    } else {
      this.setState({ open: false })
    }
  }

  render() {
    const { open, list } = this.state
    return (
      <div id="import-export-logger" className={s.container}>
        <div
          className={s.nav}
          onClick={this.onClick}
          onDrag={this.onDrag}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onDoubleClick={this.onDoubleClick}
        >
          <div className={s.title}>
            <span className={s.upper}>{i18n.t('Logger')}</span>
            <span>
              {i18n.t('view messages received on using import/export forms.')}
            </span>
          </div>
          <div className={s.actions}>
            {open ? (
              <ArrowDownIcon onClick={this.onClose} />
            ) : (
              <ArrowUpIcon onClick={this.onOpen} />
            )}
          </div>
        </div>
        <div
          className={s.messages}
          ref={c => (this.elmMessages = c)}
          style={{
            display: open ? 'block' : 'none'
          }}
        >
          {open &&
            list.map(props => <Message key={`msg-${props.id}`} {...props} />)}
        </div>
      </div>
    )
  }
}
