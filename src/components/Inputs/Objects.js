import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { Objects as ObjectsGeneric } from '../../components/'
import { SINGLE_EXACT_OBJECT_VALIDATOR } from '../../components/Objects/Objects'

const VALIDATOR = composeValidators(hasValue, SINGLE_EXACT_OBJECT_VALIDATOR)

const NAME = 'object'
const LABEL = i18n.t('Object')
const DATATEST = 'input-object-select'

const Objects = props => (
    <ObjectsGeneric
        name={NAME}
        label={LABEL}
        validator={VALIDATOR}
        dataTest={DATATEST}
        {...props}
    />
)

export { Objects }
