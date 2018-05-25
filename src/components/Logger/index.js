import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { SvgIcon } from 'material-ui'
import { eventEmitter } from 'services'
import s from './styles.css'
import moment from 'moment/moment'

const iconProps = {
  style: {
    width: 32,
    height: 32
  },
  color: '#fff'
}

function ArrowUpIcon({ onClick }) {
  return (
    <SvgIcon {...iconProps} onClick={onClick}>
      <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3" />
        <path fill="none" d="M0,0h24v24H0V0z" />
      </g>
      <g id="Outline">
        <g id="ui_x5F_spec_x5F_header" />
        <path d="M7.41,15.41L12,10.83l4.59,4.58L18,14l-6-6l-6,6L7.41,15.41z" />
      </g>
    </SvgIcon>
  )
}

function ArrowDownIcon({ onClick }) {
  return (
    <SvgIcon {...iconProps} onClick={onClick}>
      <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3" />
        <path fill="none" d="M0,0h24v24H0V0z" />
      </g>
      <g id="Outline">
        <g id="ui_x5F_spec_x5F_header" />
        <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
      </g>
    </SvgIcon>
  )
}

function Message({ d, subject, text }) {
  return (
    <div className={s.message}>
      <div className={s.date}>{moment(d).format('YYYY-MM-DD HH:mm:ss')}</div>
      <div className={s.contents}>
        <div className={s.subject}>{subject}</div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  )
}

export class Logger extends React.Component {
  state = {
    open: false,
    list: []
  }

  componentDidMount() {
    eventEmitter.on('log', this.onMessage)
    eventEmitter.on('log.open', this.onOpen)
    eventEmitter.on('log.close', this.onClose)
  }

  componentWillUnmount() {
    eventEmitter.off('log', this.onMessage)
    eventEmitter.off('log.open', this.onOpen)
    eventEmitter.off('log.close', this.onClose)
  }

  onMessage = msg => {
    const list = this.state.list.slice(0)
    list.push(msg)
    this.setState({ list }, this.scrollToBottom)
  }

  scrollToBottom() {
    if (!this.elmMessages) {
      return
    }

    this.elmMessages.scrollTop = this.elmMessages.scrollHeight
  }

  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })

  render() {
    // TODO toggle logger visible on receiving messages
    // TODO auto-scroll to bottom on receiving new messages inside the logger
    // TODO show the number of messages inside the logger
    // TODO show time on which event is received
    const { open, list } = this.state

    return (
      <div className={s.container}>
        <div className={s.nav}>
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
        <div className={s.messages} ref={c => this.elmMessages = c}>
          {open &&
            list.map((props , index) => (
              <Message key={`msg-${index}`} {...props} />
            ))}
        </div>
      </div>
    )
  }
}
