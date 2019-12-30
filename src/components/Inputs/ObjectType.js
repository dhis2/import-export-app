import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Select } from '../FinalFormComponents/Select'

export const OPTION_DATA_SETS = {
    value: 'dataSets',
    label: i18n.t('Data sets'),
}

export const OPTION_PROGRAMS = {
    value: 'programs',
    label: i18n.t('Programs'),
}

export const OPTION_CATEGORY_COMBOS = {
    value: 'categoryCombos',
    label: i18n.t('Category combination'),
}

export const OPTION_DASHBOARDS = {
    value: 'dashboards',
    label: i18n.t('Dashboard'),
}

export const OPTION_DATA_ELEMENT_GROUPS = {
    value: 'dataElementGroups',
    label: i18n.t('Data element groups'),
}

export const OPTION_OPTION_SETS = {
    value: 'optionSets',
    label: i18n.t('Option sets'),
}

export const OBJECT_TYPE_KEY = 'objectType'
export const OBJECT_TYPE_DEFAULT_VALUE = OPTION_DATA_SETS.value

const objectTypeLabel = i18n.t('Object type')

export const ObjectType = () => {
    return (
        <Field>
            <Select
                dataTest="input-object-type"
                name={OBJECT_TYPE_KEY}
                label={objectTypeLabel}
                options={[
                    OPTION_DATA_SETS,
                    OPTION_PROGRAMS,
                    OPTION_CATEGORY_COMBOS,
                    OPTION_DASHBOARDS,
                    OPTION_DATA_ELEMENT_GROUPS,
                    OPTION_OPTION_SETS,
                ]}
            />
        </Field>
    )
}
