import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { StyledField, Tooltip } from '../../../components/index.js'
import { EARTH_ENGINE_ID, PERIOD } from '../util/formFieldConstants.js'
import { usePeriods } from './usePeriods.js'

const { useField, useForm } = ReactFinalForm

const Periods = () => {
    const { change } = useForm()
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input
    const { loading, periods } = usePeriods(earthEngineId)

    useEffect(() => {
        change(PERIOD, undefined)
        if (periods.length === 1) {
            change(PERIOD, periods[0].value)
        }
    }, [earthEngineId, periods, change])

    return (
        <div style={{ maxWidth: '200px' }}>
            <Tooltip
                disabled={!earthEngineId}
                content={i18n.t(
                    'You must select an Earth Engine data set before selecting a period'
                )}
            >
                <StyledField
                    component={SingleSelectFieldFF}
                    name={PERIOD}
                    label={i18n.t('Period')}
                    options={periods}
                    dataTest="input-period-type"
                    helpText={i18n.t(
                        'Data from Earth Engine will be imported for this period.'
                    )}
                    placeholder={i18n.t('Select period')}
                    loading={loading}
                    loadingText={i18n.t('Loading periods')}
                    empty={i18n.t('No periods found')}
                    filled
                    validate={hasValue}
                    disabled={!earthEngineId}
                />
            </Tooltip>
        </div>
    )
}

export { Periods }
