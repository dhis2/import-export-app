import React from 'react'
import { FormAlerts as FormAlertsGeneric } from '../FormAlerts'

const DATATEST = 'input-form-alerts'

const FormAlerts = ({ alerts }) => (
    <FormAlertsGeneric alerts={alerts} dataTest={DATATEST} />
)

FormAlerts.propTypes = {
    alerts: FormAlertsGeneric.propTypes.alerts,
}

export { FormAlerts }
