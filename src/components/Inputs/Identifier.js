import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { identifierOptions } from '../../utils/options'
import { RadioGroupField } from '../'

const NAME = 'identifier'
const DATATEST = 'input-identifier'
const LABEL = i18n.t('Identifier')

const Identifier = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={identifierOptions}
        dataTest={DATATEST}
    />
)

export { Identifier }
