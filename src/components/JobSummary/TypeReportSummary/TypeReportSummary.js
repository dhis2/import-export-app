import React from 'react'
import PropTypes from 'prop-types'

import { statsPropType, messagesPropType } from '../helper'
import { SingleSummary } from '../SingleSummary/SingleSummary'
import { TypeCount, typeCountStatsPropTypeObj } from '../TypeCount/TypeCount'
import { Messages } from '../Messages/Messages'

const TypeReportSummary = ({ overviewStats, stats, messages }) => {
    return (
        <div>
            <SingleSummary importCount={overviewStats} />
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

export { TypeReportSummary }
