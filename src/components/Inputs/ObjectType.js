import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { SelectField } from '../../components/'
import { objectTypeOptions } from '../../utils/options'

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

export { ObjectType }
