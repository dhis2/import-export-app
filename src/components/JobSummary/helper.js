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

export { typeReportParse }
