import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const { useField } = ReactFinalForm

const DataElementGroup = () => {
    const { dataElementGroups } = useCachedDataQuery()
    const { input } = useField('earthEngineId')
    const { value: earthEngineId } = input

    if (!dataElementGroups || !earthEngineId) {
        return null
    }

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name="dataElementGroup"
                label={i18n.t('Data element group')}
                options={dataElementGroups}
                dataTest="input-data-element-groups"
                helpText={i18n.t(
                    'Data element groups containing current values'
                )}
                // validationText={validationText}
                filled
                filterable
                initialFocus
            />
        </div>
    )
}

export { DataElementGroup }
