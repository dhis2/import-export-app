import React from 'react'
import { SvgIcon } from 'material-ui'
import s from './styles.css'
import i18n from '@dhis2/d2-i18n'

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

function Message({ text }) {
  return <div className={s.message}>{text}</div>
}

export class Logger extends React.Component {
  state = {
    open: false,
    list: [
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' },
      { text: 'some message contents' }
    ]
  }

  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })

  render() {
    // TODO event emitter to capture logging events
    // TODO maintain list of log inside the state
    // TODO show the list of event log's inside the logger
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
          {open ? (
            <ArrowDownIcon onClick={this.onClose} />
          ) : (
            <ArrowUpIcon onClick={this.onOpen} />
          )}
        </div>
        <div className={s.messages}>
          {open &&
            list.map(({ text }, index) => (
              <Message key={`msg-${index}`} text={text} />
            ))}
        </div>
      </div>
    )
  }
}
