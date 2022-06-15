import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const { useField } = ReactFinalForm

const DataElements = () => {
    const { dataSets } = useCachedDataQuery()
    const { input } = useField('dataSets')
    const { value: dataSetId } = input

    if (!dataSets) {
        return null
    }

    const dataElements = dataSets[dataSetId]?.dataElements || []

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name="dataElements"
                label={i18n.t('Data element')}
                options={dataElements}
                dataTest="input-data-elements"
                helpText={i18n.t(
                    'The data element where Earth Engine data will be added'
                )}
                // validationText={validationText}
                filled
                initialFocus
            />
        </div>
    )
}

export { DataElements }
