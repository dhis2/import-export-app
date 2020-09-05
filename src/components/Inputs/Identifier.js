import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const identifierOptions = [
    { value: 'UID', label: i18n.t('UID') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'AUTO', label: i18n.t('Auto') },
]
const defaultIdentifierOption = identifierOptions[0]

const NAME = 'identifier'
const DATATEST = 'input-identifier'
const LABEL = i18n.t('Identifier')
const HELPTEXT = i18n.t('Identifier scheme to use for reference matching')

const Identifier = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={identifierOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
    />
)

export { Identifier, defaultIdentifierOption }
