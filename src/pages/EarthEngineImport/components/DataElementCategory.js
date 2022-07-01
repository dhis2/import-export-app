import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const { useField } = ReactFinalForm

const DataElementCategory = () => {
    const { dataElements } = useCachedDataQuery()
    const { input } = useField('dataElement')
    const { value: dataElementId } = input

    if (!dataElementId || !dataElements) {
        return null
    }

    const categories = dataElements
        .find(({ id }) => id === dataElementId)
        .categoryCombo.categories.map(({ id, name }) => {
            return {
                value: id,
                label: name,
            }
        })

    if (categories.length <= 1) {
        return null
    }

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                // selected={}
                name="dataElementCategory"
                label={i18n.t('Data element category')}
                options={categories}
                dataTest="input-data-element-categories"
                helpText={i18n.t('The category')}
                // validationText={validationText}
                filled
                filterable
                initialFocus
            />
        </div>
    )
}

export { DataElementCategory }
