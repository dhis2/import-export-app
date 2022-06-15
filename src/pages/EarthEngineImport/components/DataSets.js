import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const DataSets = () => {
    const { dataSets } = useCachedDataQuery()

    if (!dataSets) {
        return null
    }

    const options = Object.values(dataSets)

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name="dataSets"
                label={i18n.t('Data set')}
                options={options}
                dataTest="input-data-sets"
                helpText={i18n.t('Choose data set.')}
                // validationText={validationText}
                filled
                initialFocus
            />
        </div>
    )
}

export { DataSets }
