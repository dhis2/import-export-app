import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { DATA_ELEMENT_ID } from '../util/formFieldConstants.js'

const DataElements = () => {
    // TODO - clear the selection if earth engine id changes
    const { dataElements } = useCachedDataQuery()

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name={DATA_ELEMENT_ID}
                label={i18n.t('Data element')}
                options={dataElements}
                dataTest="input-data-elements"
                helpText={i18n.t(
                    'The data element where Earth Engine data will be added'
                )}
                // validationText={validationText}
                filled
                filterable
                validate={hasValue}
            />
        </div>
    )
}

export { DataElements }
