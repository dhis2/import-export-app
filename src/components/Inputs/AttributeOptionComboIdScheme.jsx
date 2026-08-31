import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultAttributeOptionComboIdSchemeOption = ''

const NAME = 'attributeOptionComboIdScheme'
const DATATEST = 'input-attribute-option-combo-id-scheme'
const LABEL = i18n.t('Attribute option combo ID scheme')

const AttributeOptionComboIdScheme = () => (
    <IdSchemeSelect name={NAME} label={LABEL} dataTest={DATATEST} />
)

export {
    AttributeOptionComboIdScheme,
    defaultAttributeOptionComboIdSchemeOption,
}
