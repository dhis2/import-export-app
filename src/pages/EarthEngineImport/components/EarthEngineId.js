import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index'
import {
    getEarthEngineConfigs,
    POPULATION_DATASET_ID,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines'

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
            name="earthEngineId"
            label={i18n.t('Earth Engine data set')}
            options={eeList}
            dataTest="input-earthengine-id"
            helpText={i18n.t(
                'Not all Earth Engine data sets are available yet.'
            )}
            filled
            initialFocus
        />
    </div>
)

export { EarthEngineId }
