import PropTypes from 'prop-types'

const statsPropTypeObj = {
    deleted: PropTypes.number.isRequired,
    ignored: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
    imported: PropTypes.number,
    created: PropTypes.number,
}

const statsPropType = PropTypes.exact(statsPropTypeObj)

const getClassName = c => {
    const s = c.split('.')
    return s[s.length - 1]
}

const typeReportParse = report => {
    let allStats = []
    const allMessages = []

    Object.keys(report).forEach(i => {
        const { klass, objectReports, stats } = report[i]

        allStats = [
            ...allStats,
            {
                ...stats,
                type: getClassName(klass),
            },
        ]

        objectReports &&
            objectReports.forEach(r => {
                const { uid, errorReports } = r

                errorReports &&
                    errorReports.forEach(e => {
                        allMessages.push({
                            uid,
                            type: getClassName(e.mainKlass),
                            property: e.errorProperty,
                            message: e.message,
                        })
                    })
            })
    })

    return { stats: allStats, messages: allMessages }
}

const messagesPropType = PropTypes.arrayOf(
    PropTypes.exact({
        uid: PropTypes.string,
        type: PropTypes.string,
        property: PropTypes.string,
        message: PropTypes.string,
    })
)

export { typeReportParse, statsPropType, statsPropTypeObj, messagesPropType }
