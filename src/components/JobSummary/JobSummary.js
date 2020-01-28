import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRowHead,
    TableCellHead,
} from '@dhis2/ui-core'

import s from './JobSummary.module.css'
import { typeReportParse } from './helper'
import { jsDateToString } from '../../utils/helper'
import { testIds } from '../../utils/testIds'
import { FormField } from '../FormField'
import { Chip } from './Chip/'

const statsPropTypeObj = {
    deleted: PropTypes.number.isRequired,
    ignored: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
    imported: PropTypes.number,
    created: PropTypes.number,
}

const statsPropType = PropTypes.exact(statsPropTypeObj)

const SingleStatusTable = ({ status, description }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('Description')}</TableCellHead>
            </TableRowHead>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>{status}</TableCell>
                <TableCell>{description}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
)

SingleStatusTable.propTypes = {
    description: PropTypes.string,
    status: PropTypes.string,
}

const SingleSummary = ({ importCount, status, description, conflicts, id }) => (
    <div className={s.summary}>
        <FormField
            label={`${i18n.t('Summary')} #${id}`}
            dataTest={testIds.JobSummary.singleSummary}
            name="summary"
        >
            <>
                {status && (
                    <SingleStatusTable
                        description={description}
                        status={status}
                    />
                )}
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>{i18n.t('Created')}</TableCellHead>
                            <TableCellHead>{i18n.t('Deleted')}</TableCellHead>
                            <TableCellHead>{i18n.t('Ignored')}</TableCellHead>
                            <TableCellHead>{i18n.t('Updated')}</TableCellHead>
                            <TableCellHead>{i18n.t('Total')}</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{importCount.imported}</TableCell>
                            <TableCell>{importCount.deleted}</TableCell>
                            <TableCell>{importCount.ignored}</TableCell>
                            <TableCell>{importCount.updated}</TableCell>
                            <TableCell>{importCount.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </>
        </FormField>
        {conflicts && (
            <FormField
                label={`${i18n.t('Conflicts')}`}
                dataTest={testIds.JobSummary.conflicts}
                name="conflicts"
            >
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>{i18n.t('Object')}</TableCellHead>
                            <TableCellHead>{i18n.t('Value')}</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {conflicts.map(c => (
                            <TableRow
                                key={`${testIds.JobSummary.conflicts}-${c.object}`}
                            >
                                <TableCell>{c.object}</TableCell>
                                <TableCell>{c.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </FormField>
        )}
    </div>
)

SingleSummary.propTypes = {
    id: PropTypes.string.isRequired,
    importCount: statsPropType.isRequired,
    conflicts: PropTypes.arrayOf(
        PropTypes.exact({
            object: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    description: PropTypes.string,
    status: PropTypes.string,
}

const TypeCount = ({ stats }) => {
    if (stats.length == 0) return null
    return (
        <FormField
            label={`${i18n.t('Type count')}`}
            dataTest={testIds.JobSummary.typeCount}
            name="typeCount"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('Type')}</TableCellHead>
                        <TableCellHead>{i18n.t('Created')}</TableCellHead>
                        <TableCellHead>{i18n.t('Deleted')}</TableCellHead>
                        <TableCellHead>{i18n.t('Ignored')}</TableCellHead>
                        <TableCellHead>{i18n.t('Updated')}</TableCellHead>
                        <TableCellHead>{i18n.t('Total')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {stats.map((s, i) => (
                        <TableRow key={`${testIds.JobSummary.typeCount}-${i}`}>
                            <TableCell>{s.type}</TableCell>
                            <TableCell>{s.created}</TableCell>
                            <TableCell>{s.deleted}</TableCell>
                            <TableCell>{s.ignored}</TableCell>
                            <TableCell>{s.updated}</TableCell>
                            <TableCell>{s.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

const typeCountStatsPropTypeObj = {
    ...statsPropTypeObj,
    type: PropTypes.string.isRequired,
}

TypeCount.propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape(typeCountStatsPropTypeObj))
        .isRequired,
}

const Messages = ({ messages }) => {
    if (messages.length == 0) return null
    return (
        <FormField
            label={`${i18n.t('Messages')}`}
            dataTest={testIds.JobSummary.messages}
            name="messages"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('UID')}</TableCellHead>
                        <TableCellHead>{i18n.t('Type')}</TableCellHead>
                        <TableCellHead>{i18n.t('Property')}</TableCellHead>
                        <TableCellHead>{i18n.t('Message')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {messages.map((m, i) => (
                        <TableRow key={`${testIds.JobSummary.messages}-${i}`}>
                            <TableCell>{m.uid}</TableCell>
                            <TableCell>{m.type}</TableCell>
                            <TableCell>{m.property}</TableCell>
                            <TableCell>{m.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

const messagesPropType = PropTypes.arrayOf(
    PropTypes.exact({
        uid: PropTypes.string,
        type: PropTypes.string,
        property: PropTypes.string,
        message: PropTypes.string,
    })
)

Messages.propTypes = {
    messages: messagesPropType.isRequired,
}

const TypeReportSummary = ({ overviewStats, stats, messages }) => {
    return (
        <div className={s.typeReports}>
            <SingleSummary
                importCount={overviewStats}
                id={i18n.t('Overview')}
            />
            <TypeCount stats={stats} />
            <Messages messages={messages} />
        </div>
    )
}

TypeReportSummary.propTypes = {
    messages: messagesPropType.isRequired,
    overviewStats: statsPropType.isRequired,
    stats: PropTypes.arrayOf(PropTypes.exact(typeCountStatsPropTypeObj))
        .isRequired,
}

const Summary = ({ summary }) => {
    // gml import type object return
    if (summary.typeReports) {
        const overviewStats = {
            ...summary.stats,
            imported: summary.stats.created,
        }
        const { stats, messages } = typeReportParse(summary.typeReports)
        return (
            <div className={s.summaries} data-test={testIds.JobSummary.summary}>
                <TypeReportSummary
                    overviewStats={overviewStats}
                    stats={stats}
                    messages={messages}
                />
            </div>
        )
    }

    let imported, deleted, ignored, updated, total
    if (summary.responseType == 'ImportSummaries') {
        ;({ imported, deleted, ignored, updated, total } = summary)
    } else if (summary.importCount) {
        ;({ imported, deleted, ignored, updated } = summary.importCount)
        total = imported + deleted + ignored + updated
    } else if (summary.stats) {
        ;({ imported, deleted, ignored, updated, total } = summary.stats)
    }

    const importCount = {
        imported,
        deleted,
        ignored,
        updated,
        total,
    }

    const overviewSummary = (
        <SingleSummary
            importCount={importCount}
            status={summary.status}
            description={summary.description}
            conflicts={summary.conflicts}
            id={i18n.t('Overview')}
        />
    )
    const allSummaries =
        summary.responseType == 'ImportSummaries'
            ? summary.importSummaries.map((s, i) => {
                  ;({ imported, deleted, ignored, updated } = s.importCount)
                  total = imported + deleted + ignored + updated
                  const importCount = {
                      imported,
                      deleted,
                      ignored,
                      updated,
                      total,
                  }
                  return (
                      <SingleSummary
                          key={`single-summary-${i}`}
                          importCount={importCount}
                          status={s.status}
                          description={s.description}
                          conflicts={s.conflicts}
                          id={`${i + 1}`}
                      />
                  )
              })
            : []

    return (
        <div className={s.summaries} data-test={testIds.JobSummary.summary}>
            {overviewSummary}
            {allSummaries}
        </div>
    )
}

Summary.propTypes = {
    summary: PropTypes.object.isRequired,
}

const Events = ({ events }) => {
    return (
        <div className={s.summary}>
            <FormField
                label={`${i18n.t('Events')}`}
                dataTest={testIds.JobSummary.events}
                name="events"
            >
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>{i18n.t('Time')}</TableCellHead>
                            <TableCellHead>{i18n.t('Message')}</TableCellHead>
                            <TableCellHead>{i18n.t('ID')}</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {events.map(e => (
                            <TableRow
                                key={`${testIds.JobSummary.events}-${e.id}`}
                            >
                                <TableCell>{jsDateToString(e.date)}</TableCell>
                                <TableCell>{e.text}</TableCell>
                                <TableCell>{e.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </FormField>
        </div>
    )
}

const eventPropType = PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
})

Events.propTypes = {
    events: PropTypes.arrayOf(eventPropType).isRequired,
}

const JobSummary = ({ task, showDetails = true, dataTest }) => {
    if (!task) return null

    return (
        <div className={s.container} data-test={dataTest}>
            <div className={s.header}>
                <h3 className={s.title}>{`${i18n.t('Job summary')}`}</h3>
                {showDetails && (
                    <span className={s.taskDetails}>
                        <span data-test={testIds.JobSummary.filename}>
                            {task.file}
                        </span>{' '}
                        -{' '}
                        <span data-test={testIds.JobSummary.date}>
                            {jsDateToString(task.created)}{' '}
                        </span>
                    </span>
                )}
            </div>
            <div className={s.chips} data-test={testIds.JobSummary.chips}>
                {task.completed ? (
                    <Chip success text={i18n.t('Completed')} />
                ) : (
                    <Chip text={i18n.t('In progress')} />
                )}
                {task.error && <Chip error text={i18n.t('Error')} />}
                {task.summary && task.summary.conflicts && (
                    <Chip warning text={i18n.t('Conflicts')} />
                )}
            </div>
            <Divider />
            {task.completed && task.summary && (
                <Summary summary={task.summary} />
            )}
            <div className={s.events}>
                <Events events={task.events} />
            </div>
        </div>
    )
}

JobSummary.propTypes = {
    dataTest: PropTypes.string.isRequired,
    showDetails: PropTypes.bool,
    task: PropTypes.object,
}

export { JobSummary }
