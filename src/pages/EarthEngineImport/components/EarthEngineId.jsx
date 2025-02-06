import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { earthEngines } from '../util/earthEngines.js'
import { EARTH_ENGINE_ID } from '../util/formFieldConstants.js'

const options = Object.values(earthEngines).map(({ name, earthEngineId }) => ({
    label: name,
    value: earthEngineId,
}))

const EarthEngineId = () => (
    <div style={{ maxWidth: '350px' }}>
        <StyledField
            component={SingleSelectFieldFF}
            name={EARTH_ENGINE_ID}
            label={i18n.t('Earth Engine data set')}
            options={options}
            dataTest="input-earthengine-id"
            placeholder={i18n.t('Select earth engine data set')}
            filled
            initialFocus
            validate={hasValue}
        />
    </div>
)

export { EarthEngineId }
