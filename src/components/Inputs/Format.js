import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'
import { optionsPropType } from '../../utils/options'

const formatOptions = [
    { value: 'json', label: i18n.t('JSON') },
    { value: 'csv', label: i18n.t('CSV') },
    { value: 'xml', label: i18n.t('XML') },
]
const formatNoCsvOptions = formatOptions.filter(f => f.value != 'csv')
const formatAdxOptions = [
    ...formatOptions,
    { value: 'adx', label: i18n.t('ADX') },
]
const formatAdxPdfOptions = [
    ...formatAdxOptions,
    { value: 'pdf', label: i18n.t('PDF') },
]
const formatJsonpOptions = [
    ...formatOptions,
    { value: 'jsonp', label: i18n.t('JSONP') },
]
const defaultFormatOption = formatOptions[0]

const NAME = 'format'
const DATATEST = 'input-format'
const LABEL = i18n.t('Format')

const Format = ({ availableFormats }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={availableFormats}
        dataTest={DATATEST}
    />
)

Format.propTypes = {
    availableFormats: optionsPropType.isRequired,
}

export {
    Format,
    formatOptions,
    formatNoCsvOptions,
    formatAdxOptions,
    formatAdxPdfOptions,
    formatJsonpOptions,
    defaultFormatOption,
}
