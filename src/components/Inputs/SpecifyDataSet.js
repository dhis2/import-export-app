import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CheckboxField, hasValue } from '@dhis2/ui'
import React, { useState } from 'react'
import { FormField, ResourcePickerField } from '../index.js'
import { resourceTypes } from '../ResourcePicker/resourceTypes.js'

const DATASET_SELECTOR_NAME = 'specifiedDataSet'
const DATATEST_DATASET_SELECTOR = 'input-data-set-picker'
const LISTNAME = 'specifiedDataSet'
const FILTERLABEL = i18n.t('Filter data sets')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the data sets!')
const RESOURCETYPE = resourceTypes.DATASET

const SelectDataSet = () => (
    <div style={{ width: '600px' }}>
        <ResourcePickerField
            name={DATASET_SELECTOR_NAME}
            resourceType={RESOURCETYPE}
            errorMessage={ERRORMESSAGE}
            listName={LISTNAME}
            filterLabel={FILTERLABEL}
            dataTest={DATATEST_DATASET_SELECTOR}
            validator={hasValue}
            multiSelect={false}
            prefix={'Data set'}
        />
    </div>
)

const NAME = 'specifyDataSet'
const DATATEST = 'input-has-authority-to-skip-audit'
const SHORT_LABEL = i18n.t('Specify data set for data import')
const LABEL = i18n.t('Specify the data set that imported data must belong to')

const settingsQuery = {
    systemSettings: {
        resource: 'systemSettings',
    },
}

const SpecifyDataSet = () => {
    const [specifyDataSet, setSpecifyDataSet] = useState()
    const { data } = useDataQuery(settingsQuery)

    if (data?.systemSettings?.keyDataImportStrictDataElements) {
        return (
            <>
                <FormField label={SHORT_LABEL} dataTest={DATATEST}>
                    <CheckboxField
                        checked={specifyDataSet}
                        name={NAME}
                        label={LABEL}
                        dataTest={`${DATATEST}-sf`}
                        onChange={(e) => {
                            setSpecifyDataSet(e.checked)
                        }}
                    />
                </FormField>
                {specifyDataSet && <SelectDataSet />}
            </>
        )
    }

    return null
}

export { SpecifyDataSet }
