import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import styles from './Summary.module.css'
import { typeReportParse } from '../helper'
import { SingleSummary } from '../SingleSummary/SingleSummary'
import { TypeReportSummary } from '../TypeReportSummary/TypeReportSummary'

const extractStats = summary => {
    if (summary.responseType == 'ImportSummaries') {
        const { imported, deleted, ignored, updated, total } = summary
        return { imported, deleted, ignored, updated, total }
    } else if (summary.importCount) {
        const { imported, deleted, ignored, updated } = summary.importCount
        const total = imported + deleted + ignored + updated
        return { imported, deleted, ignored, updated, total }
    } else if (summary.stats) {
        const { imported, deleted, ignored, updated, total } = summary.stats
        return { imported, deleted, ignored, updated, total }
    }
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
            <div
                data-test="job-summary-summary"
                className={styles.typeReportSummary}
            >
                <TypeReportSummary
                    overviewStats={overviewStats}
                    stats={stats}
                    messages={messages}
                />
            </div>
        )
    }

    const importCount = extractStats(summary)

    const overviewSummary = (
        <SingleSummary
            importCount={importCount}
            status={summary.status}
            description={summary.description}
            conflicts={
                summary.conflicts &&
                (summary.conflicts.length || null) &&
                summary.conflicts
            }
            id={i18n.t('Overview')}
        />
    )
    const allSummaries =
        summary.responseType == 'ImportSummaries' && summary.importSummaries
            ? summary.importSummaries.map((s, i) => {
                  const importCount = extractStats(s)
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
            : null

    return (
        <div data-test="job-summary-summary" className={styles.container}>
            {overviewSummary}
            <div className={styles.rest} data-test="job-summary-summary-rest">
                {allSummaries}
            </div>
        </div>
    )
}

Summary.propTypes = {
    summary: PropTypes.object.isRequired,
}

export { Summary }
