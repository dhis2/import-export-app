import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { typeReportParse } from '../helper'
import { testIds } from '../../../utils/testIds'
import { SingleSummary } from '../SingleSummary/'
import { TypeReportSummary } from '../TypeReportSummary/'

const Summary = ({ summary }) => {
    // gml import type object return
    if (summary.typeReports) {
        const overviewStats = {
            ...summary.stats,
            imported: summary.stats.created,
        }
        const { stats, messages } = typeReportParse(summary.typeReports)
        return (
            <div data-test={testIds.JobSummary.summary}>
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
        summary.responseType == 'ImportSummaries' && summary.importSummaries
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
        <div data-test={testIds.JobSummary.summary}>
            {overviewSummary}
            {allSummaries}
        </div>
    )
}

Summary.propTypes = {
    summary: PropTypes.object.isRequired,
}

export { Summary }
