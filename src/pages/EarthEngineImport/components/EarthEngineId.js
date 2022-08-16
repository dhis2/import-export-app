import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import {
    getEarthEngineConfigs,
    POPULATION_DATASET_ID,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines.js'
import { EARTH_ENGINE_ID } from '../util/getFormValues.js'

const eeList = getEarthEngineConfigs([
    POPULATION_AGE_GROUPS_DATASET_ID,
    POPULATION_DATASET_ID,
]).map(({ name, datasetId }) => ({
    label: name,
    value: datasetId,
}))

const EarthEngineId = () => (
    <div style={{ maxWidth: '350px' }}>
        <StyledField
            component={SingleSelectFieldFF}
            name={EARTH_ENGINE_ID}
            label={i18n.t('Earth Engine data set')}
            options={eeList}
            dataTest="input-earthengine-id"
            helpText={i18n.t(
                'Not all Earth Engine data sets are available yet.'
            )}
            filled
            initialFocus
            validate={hasValue}
        />
    </div>
)

export { EarthEngineId }
