import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.jsx'
import { DATA_ELEMENT_ID } from '../util/formFieldConstants.js'

const DataElements = () => {
    const { dataElements } = useCachedDataQuery()

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name={DATA_ELEMENT_ID}
                label={i18n.t('Data element')}
                placeholder={i18n.t('Select data element')}
                options={dataElements}
                dataTest="input-data-elements"
                helpText={i18n.t(
                    'The data element where Earth Engine data will be added'
                )}
                filled
                filterable
                validate={hasValue}
            />
        </div>
    )
}

export { DataElements }
