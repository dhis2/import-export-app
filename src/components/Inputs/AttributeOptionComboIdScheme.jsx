import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { AttributeOptionComboIdScheme as AttributeOptionComboIdSchemeGeneric } from '../index.js'

const attributeOptionComboIdSchemeOptions = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultAttributeOptionComboIdSchemeOption =
    attributeOptionComboIdSchemeOptions[0].value

const NAME = 'attributeOptionComboIdScheme'
const DATATEST = 'input-attribute-option-combo-id-scheme'
const LABEL = i18n.t('Attribute option combo ID scheme')

const AttributeOptionComboIdScheme = () => (
    <AttributeOptionComboIdSchemeGeneric
        name={NAME}
        label={LABEL}
        attributeOptionComboIdSchemeOptions={
            attributeOptionComboIdSchemeOptions
        }
        dataTest={DATATEST}
    />
)

export {
    AttributeOptionComboIdScheme,
    defaultAttributeOptionComboIdSchemeOption,
}
