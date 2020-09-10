import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AlertStack, AlertBar } from '@dhis2/ui'

const FormAlerts = ({ alerts, dataTest }) => {
    const [bars, setBars] = useState([])

    useEffect(() => {
        if (alerts) {
            const newBars = alerts.map(a => (
                <AlertBar
                    key={`alert-${a.id}`}
                    warning={a.warning}
                    info={a.info}
                    critical={a.critical}
                    success={a.success}
                    duration={5000}
                >
                    {a.message}
                </AlertBar>
            ))
            setBars(newBars)
        }
    }, [alerts])

    if (bars.length == 0) return null

    return <AlertStack data-test={dataTest}>{bars}</AlertStack>
}

FormAlerts.propTypes = {
    dataTest: PropTypes.string.isRequired,
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            critical: PropTypes.bool,
            info: PropTypes.bool,
            warning: PropTypes.bool,
        })
    ),
}

export { FormAlerts }
