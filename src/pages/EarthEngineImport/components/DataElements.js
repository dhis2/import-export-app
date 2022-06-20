import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const DataElements = () => {
    const { dataElements } = useCachedDataQuery()

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
                filterable
                initialFocus
            />
        </div>
    )
}

export { DataElements }
