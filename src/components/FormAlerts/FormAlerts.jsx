import { AlertStack, AlertBar } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const FormAlerts = ({ alerts, dataTest }) => (
    <AlertStack data-test={dataTest}>
        {alerts &&
            alerts.map((a) => (
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
            ))}
    </AlertStack>
)

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
