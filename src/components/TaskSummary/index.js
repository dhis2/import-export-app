import React, { Fragment } from 'react'
import i18n from '@dhis2/d2-i18n'

import { eventEmitter } from 'services'
import { Loading } from 'components'
import { Totals, TypeStats, Conflicts, Messages, Summaries } from './helpers'
import s from './styles.css'

const initialState = {
    loading: false,

    stats: {
        created: 0,
        deleted: 0,
        ignored: 0,
        updated: 0,
        total: 0,
    },

    typeStats: [],
    conflicts: [],
    summaries: [],
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
        Object.entries(this.events).forEach(([evt, fn]) => {
            eventEmitter.on(evt, fn)
        })
    }

    componentWillUnmount() {
        Object.entries(this.events).forEach(([evt, fn]) =>
            eventEmitter.off(evt, fn)
        )
    }

    onLoaded = () => this.setState({ loading: false })

    onLoading = () => this.setState({ loading: true })
    onClear = () => this.setState({ ...initialState })
    onTotals = stats => this.setState({ stats })

    onTypeReports = report => {
        const newStats = []
        const newMessages = []

        Object.keys(report).forEach(i => {
            const { klass, objectReports, stats } = report[i]

            newStats.push({
                ...stats,
                type: getClassName(klass),
            })

            objectReports &&
                objectReports.forEach(r => {
                    const { uid, errorReports } = r

                    errorReports.forEach(e => {
                        newMessages.push({
                            uid,
                            type: getClassName(e.mainKlass),
                            property: e.errorProperty,
                            message: e.message,
                        })
                    })
                })
        })
        const typeStats = this.state.typeStats.concat(newStats)
        const messages = this.state.messages.concat(newMessages)

        this.setState({ typeStats, messages })
    }

    onImportCount = ({ deleted, ignored, updated, imported }) =>
        this.setState({
            stats: {
                deleted,
                ignored,
                updated,
                created: imported,
                total: deleted + ignored + updated + imported,
            },
        })

    onConflicts = conflicts => this.setState({ conflicts })

    onImportSummaries = rows => {
        this.setState({
            summaries: rows.slice(0),
        })
    }

    events = {
        'summary.loading': this.onLoading,
        'summary.loaded': this.onLoaded,
        'summary.clear': this.onClear,
        'summary.totals': this.onTotals,
        'summary.typeReports': this.onTypeReports,
        'summary.importCount': this.onImportCount,
        'summary.conflicts': this.onConflicts,
        'summary.importSummaries': this.onImportSummaries,
    }

    viewTypeStats() {
        const { typeStats } = this.state
        if (typeStats.length === 0) {
            return null
        }

        return (
            <Fragment>
                <div className={`${s.label} ${s.marginTop}`}>
                    {i18n.t('Type Count')}
                </div>

                <TypeStats list={typeStats} />
            </Fragment>
        )
    }

    viewMessages() {
        const { messages } = this.state
        if (messages.length === 0) {
            return null
        }

        return (
            <Fragment>
                <div className={`${s.label} ${s.marginTop}`}>
                    {i18n.t('Messages')}
                </div>
                <Messages list={messages} />
            </Fragment>
        )
    }

    viewImportSummaries() {
        const { summaries } = this.state
        if (summaries.length === 0) {
            return null
        }

        return (
            <Fragment>
                <div className={`${s.label} ${s.marginTop}`}>
                    {i18n.t('Summaries')}
                </div>
                <Summaries list={summaries} />
            </Fragment>
        )
    }

    viewConflicts() {
        const { conflicts } = this.state
        if (conflicts === 0) {
            return null
        }

        return (
            <Fragment>
                <div className={`${s.label} ${s.marginTop}`}>
                    {i18n.t('Conflicts')}
                </div>
                <Conflicts list={conflicts} />
            </Fragment>
        )
    }

    isEmpty() {
        const { stats, typeStats, messages, summaries } = this.state
        if (
            stats.total === 0 &&
            typeStats.length === 0 &&
            summaries.length === 0 &&
            messages.length === 0
        ) {
            return true
        }

        return false
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        if (this.isEmpty()) {
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

                    {this.viewTypeStats()}
                    {this.viewConflicts()}
                    {this.viewMessages()}
                    {this.viewImportSummaries()}
                </div>
            </div>
        )
    }
}
