import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AlertBar } from '@dhis2/ui-core'

import styles from './FormAlerts.module.css'

const FormAlerts = ({ alerts, dataTest }) => {
    const [bars, setBars] = useState([])

    useEffect(() => {
        const newBars = alerts.map(a => (
            <AlertBar
                key={`alert-${a.id}`}
                warning={a.warning}
                info={a.info}
                critical={a.critical}
                success={a.success}
                duration={8000}
            >
                {a.message}
            </AlertBar>
        ))
        setBars(newBars)
    }, [alerts])

    if (bars.length == 0) return null

    return (
        <div className={styles.container} data-test={dataTest}>
            {bars}
        </div>
    )
}

FormAlerts.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            critical: PropTypes.bool,
            info: PropTypes.bool,
            warning: PropTypes.bool,
        })
    ).isRequired,
    dataTest: PropTypes.string.isRequired,
}

export { FormAlerts }
