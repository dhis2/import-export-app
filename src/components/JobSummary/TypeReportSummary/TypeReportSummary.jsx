import PropTypes from 'prop-types'
import React from 'react'
import { statsPropType, messagesPropType } from '../helper.js'
import { Messages } from '../Messages/Messages.jsx'
import { SingleSummary } from '../SingleSummary/SingleSummary.jsx'
import { TypeCount, typeCountStatsPropTypeObj } from '../TypeCount/TypeCount.jsx'

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
