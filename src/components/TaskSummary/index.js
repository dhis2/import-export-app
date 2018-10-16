import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { eventEmitter } from 'services'
import { Totals, TypeStats, Messages } from './helpers'
import s from './styles.css'

const initialState = {
    stats: {
        created: 0,
        deleted: 0,
        ignored: 0,
        updated: 0,
        total: 0,
    },

    typeStats: [],

    messages: [],
}

function getClassName(c) {
    return c.substr(c.lastIndexOf('.') + 1)
}

export class TaskSummary extends React.Component {
    state = {
        ...initialState,
    }

    componentDidMount() {
        eventEmitter.on('summary.clear', this.onClear)
        eventEmitter.on('summary.totals', this.onTotals)
        eventEmitter.on('summary.typeReports', this.onTypeReports)
    }

    componentWillUnmount() {
        eventEmitter.off('summary.clear', this.onClear)
        eventEmitter.off('summary.totals', this.onTotals)
        eventEmitter.off('summary.typeReports', this.onTypeReports)
    }

    onClear = () => this.setState({ ...initialState })

    onTotals = stats => this.setState({ stats })

    onTypeReports = report => {
        const typeStats = this.state.typeStats || []
        const messages = this.state.messages || []

        Object.keys(report).forEach(i => {
            const { klass, objectReports, stats } = report[i]

            typeStats.push({
                ...stats,
                type: getClassName(klass),
            })

            objectReports.forEach(r => {
                const { uid, errorReports } = r

                errorReports.forEach(e => {
                    messages.push({
                        uid,
                        type: getClassName(e.mainKlass),
                        property: e.errorProperty,
                        message: e.message,
                    })
                })
            })
        })

        this.setState({ typeStats, messages })
    }

    render() {
        const { stats, typeStats, messages } = this.state
        if (
            stats.total === 0 &&
            typeStats.length === 0 &&
            messages.length === 0
        ) {
            return null
        }

        return (
            <div className={s.container}>
                <div className={s.head}>
                    <div className={s.title}>{i18n.t('Import Summary')}</div>
                </div>
                <div className={s.content}>
                    <div className={s.label}>{i18n.t('Summary')}</div>
                    <Totals {...this.state.stats} />

                    <div className={`${s.label} ${s.marginTop}`}>
                        {i18n.t('Type Count')}
                    </div>
                    <TypeStats list={this.state.typeStats} />

                    <div className={`${s.label} ${s.marginTop}`}>
                        {i18n.t('Messages')}
                    </div>
                    <Messages list={this.state.messages} />
                </div>
            </div>
        )
    }
}
