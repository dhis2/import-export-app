import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { StyledField } from '../../../components/index'
import { usePeriods } from './usePeriods'

const { useField } = ReactFinalForm

const Periods = ({ form }) => {
    const { input } = useField('earthEngineId')
    const { value: earthEngineId } = input
    const setSelected = (val) => form.change('period', val)

    const { loading, error, validationText, periods } = usePeriods(
        earthEngineId,
        setSelected
    )

    // TODO - handle error
    if (loading || error) {
        return null
    }

    return (
        <div style={{ maxWidth: '200px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name="period"
                label={i18n.t('Period')}
                options={periods}
                dataTest="input-period-type"
                helpText={i18n.t(
                    'Data from Earth Engine will be imported for this period.'
                )}
                validationText={validationText}
                filled
                initialFocus
            />
        </div>
    )
}

Periods.propTypes = {
    form: PropTypes.object.isRequired,
}

export { Periods }
