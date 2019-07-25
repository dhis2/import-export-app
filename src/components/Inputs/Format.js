import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../form/RadioGroup'

export const OPTION_JSON = { value: 'json', label: i18n.t('json') }
export const OPTION_XML = { value: 'xml', label: i18n.t('xml') }
export const OPTION_PDF = { value: 'pdf', label: i18n.t('pdf') }
export const OPTION_ADX = { value: 'adx', label: i18n.t('adx') }
export const OPTION_CSV = { value: 'csv', label: i18n.t('csv') }
export const FORMAT_KEY = 'format'
export const FORMAT_DEFAULT_VALUE = OPTION_JSON.value

export const Format = ({ options }) => (
    <RadioGroup name={FORMAT_KEY} label={i18n.t('Format')} options={options} />
)

Format.propTypes = {
    options: RadioGroup.propTypes.options,
}
