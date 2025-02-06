import PropTypes from 'prop-types'
import React from 'react'
import { typeReportParse } from '../helper.js'
import { SingleSummary } from '../SingleSummary/SingleSummary.jsx'
import { TypeReportSummary } from '../TypeReportSummary/TypeReportSummary.jsx'
import styles from './Summary.module.css'

const extractStats = (summary) => {
    if (summary.responseType == 'ImportSummaries') {
        const { imported, deleted, ignored, updated, total } = summary
        return { imported, deleted, ignored, updated, total }
    } else if (summary.importCount) {
        const { imported, deleted, ignored, updated } = summary.importCount
        const total = imported + deleted + ignored + updated
        return { imported, deleted, ignored, updated, total }
    } else if (summary.stats) {
        return summary.stats
    }
}

const Summary = ({ summary, importType }) => {
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
            importType={importType}
            importCount={importCount}
            status={summary.status}
            description={summary.description}
            validationReport={summary.validationReport}
            conflicts={
                summary.conflicts &&
                (summary.conflicts.length || null) &&
                summary.conflicts
            }
        />
    )
    const allSummaries =
        summary.responseType == 'ImportSummaries' && summary.importSummaries
            ? summary.importSummaries.map((s, i) => {
                  const importCount = extractStats(s)
                  return (
                      <SingleSummary
                          key={`single-summary-${i}`}
                          importType={importType}
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
    importType: PropTypes.string,
}

export { Summary }
