import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { StyledField } from '../../../components/index.js'
import { EARTH_ENGINE_ID, PERIOD } from '../util/getFormValues.js'
import { usePeriods } from './usePeriods.js'

const { useField } = ReactFinalForm

const Periods = ({ formChange }) => {
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input
    const { validationText, periods } = usePeriods(earthEngineId)

    useEffect(() => {
        formChange(PERIOD, undefined)
        if (periods.length === 1) {
            formChange(PERIOD, periods[0].value)
        }
    }, [earthEngineId, periods, formChange])

    // TODO - show spinner while periods are loading

    return (
        <div style={{ maxWidth: '200px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name={PERIOD}
                label={i18n.t('Period')}
                options={periods}
                dataTest="input-period-type"
                helpText={i18n.t(
                    'Data from Earth Engine will be imported for this period.'
                )}
                validationText={validationText}
                filled
                validate={hasValue}
            />
        </div>
    )
}

Periods.propTypes = {
    formChange: PropTypes.func.isRequired,
}

export { Periods }
