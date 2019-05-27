/* eslint-disable */

import React from 'react'
import i18n from '@dhis2/d2-i18n'
import moment from 'moment/moment'
import { eventEmitter } from '../../services'
import s from './styles.module.css'

const iconProps = {
    width: 32,
    height: 32,
    fill: '#fff',
}

function ArrowIcon({ children, onClick }) {
    return (
        <svg viewBox="0 0 24 24" {...iconProps} onClick={onClick}>
            <g id="Bounding_Boxes">
                <g id="ui_x5F_spec_x5F_header_copy_3" />
                <path fill="none" d="M0,0h24v24H0V0z" />
            </g>
            <g id="Outline">
                <g id="ui_x5F_spec_x5F_header" />
                {children}
            </g>
        </svg>
    )
}

function ArrowUpIcon({ onClick }) {
    return (
        <ArrowIcon onClick={onClick}>
            <path d="M7.41,15.41L12,10.83l4.59,4.58L18,14l-6-6l-6,6L7.41,15.41z" />
        </ArrowIcon>
    )
}
function ArrowDownIcon({ onClick }) {
    return (
        <ArrowIcon onClick={onClick}>
            <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
        </ArrowIcon>
    )
}

function Message({ date, type, text }) {
    return (
        <div className={s.message}>
            <div className={s.date}>{date || '--:--'}</div>
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
        list: [],
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
                    open: true,
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

    headerTitle() {
        return (
            <div className={s.title}>
                <span className={s.upper}>{i18n.t('Logger')}</span>
                <span>
                    {i18n.t(
                        'view messages received on using import/export forms.'
                    )}
                </span>
            </div>
        )
    }

    headerActions() {
        return (
            <div className={s.actions}>
                {this.state.open ? (
                    <ArrowDownIcon onClick={this.onClose} />
                ) : (
                    <ArrowUpIcon onClick={this.onOpen} />
                )}
            </div>
        )
    }

    header() {
        return (
            <div
                className={s.nav}
                onClick={this.onClick}
                onDrag={this.onDrag}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDoubleClick={this.onDoubleClick}
            >
                {this.headerTitle()}
                {this.headerActions()}
            </div>
        )
    }

    /**
     *
     * @param {*} msg the log message
     * @param {*} prevDateHH previous message moment-date formatted with hrs (used to truncate)
     * @param {*} prevDate previous message moment-date
     * @param {*} truncate whether to truncate the timestamp, so that the returned
     * date is formatted without the parts of previous date (upto mm:ss)
     */
    getDate(msg, prevDateHH, prevDate, truncate = false) {
        if (!msg.d) {
            return null
        }
        let date = moment(msg.d).format('YYYY-MM-DD HH:mm:ss')

        if (truncate && moment(msg.d).format('YYYY-MM-DD HH') === prevDateHH) {
            date = moment(msg.d).format('mm:ss')
        } else if (
            truncate &&
            moment(msg.d).format('YYYY-MM-DD') === prevDate
        ) {
            date = moment(msg.d).format('HH:mm:ss')
        }

        return date
    }

    messages() {
        let prevType, prevDate, prevDateHH
        prevType = prevDate = prevDateHH = ''

        return this.state.list.map(msg => {
            const type = msg.type === prevType ? '' : msg.type
            const date = this.getDate(msg, prevDateHH, prevDate)

            prevType = msg.type
            prevDate = moment(msg.d).format('YYYY-MM-DD')
            prevDateHH = moment(msg.d).format('YYYY-MM-DD HH')
            return (
                <Message
                    key={`msg-${msg.id}`}
                    date={date}
                    type={type}
                    text={msg.text}
                />
            )
        })
    }

    contents() {
        return (
            <div
                className={s.messages}
                ref={c => (this.elmMessages = c)}
                style={{
                    display: this.state.open ? 'block' : 'none',
                }}
            >
                {this.state.open && this.messages()}
            </div>
        )
    }

    render() {
        return (
            <div id="import-export-logger" className={s.container}>
                {this.header()}
                {this.contents()}
            </div>
        )
    }
}
