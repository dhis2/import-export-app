import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../index.js'

const objectTypeOptions = [
    { value: 'dataSets', label: i18n.t('Data sets') },
    { value: 'programs', label: i18n.t('Programs') },
    { value: 'categoryCombos', label: i18n.t('Category combination') },
    { value: 'dashboards', label: i18n.t('Dashboard') },
    { value: 'dataElementGroups', label: i18n.t('Data element groups') },
    { value: 'optionSets', label: i18n.t('Option sets') },
]
const defaultObjectTypeOption = objectTypeOptions[0].value

const NAME = 'objectType'
const LABEL = i18n.t('Object type')
const DATATEST = 'input-object-type'

const ObjectType = () => (
    <div style={{ maxWidth: '480px' }}>
        <StyledField
            component={SingleSelectFieldFF}
            name={NAME}
            label={LABEL}
            options={objectTypeOptions}
            dataTest={DATATEST}
            filled
            initialFocus
        />
    </div>
)

export { ObjectType, defaultObjectTypeOption }
