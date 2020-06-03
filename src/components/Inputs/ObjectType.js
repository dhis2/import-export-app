import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { SelectField } from '../index'

const objectTypeOptions = [
    { value: 'dataSets', label: i18n.t('Data sets') },
    { value: 'programs', label: i18n.t('Programs') },
    { value: 'categoryCombos', label: i18n.t('Category combination') },
    { value: 'dashboards', label: i18n.t('Dashboard') },
    { value: 'dataElementGroups', label: i18n.t('Data element groups') },
    { value: 'optionSets', label: i18n.t('Option sets') },
]
const defaultObjectTypeOption = objectTypeOptions[0]

const NAME = 'objectType'
const LABEL = i18n.t('Object type')
const DATATEST = 'input-object-type'

const ObjectType = () => (
    <SelectField
        name={NAME}
        label={LABEL}
        options={objectTypeOptions}
        filled
        initialFocus
        dataTest={DATATEST}
    />
)

export { ObjectType, defaultObjectTypeOption }
