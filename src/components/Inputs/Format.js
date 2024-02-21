import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { optionsPropType } from '../../utils/options.js'
import { RadioGroupField } from '../index.js'

const formatOptions = [
    { value: 'json', label: i18n.t('JSON') },
    { value: 'csv', label: i18n.t('CSV') },
    { value: 'xml', label: i18n.t('DXF2 (XML)') },
]

const formatNoCsvOptions = formatOptions.filter((f) => f.value != 'csv')
const formatNoXmlOptions = formatOptions.filter((f) => f.value != 'xml')
const formatNoXmlNoCsvOptions = formatOptions.filter(
    (f) => !['xml', 'csv'].includes(f.value)
)

const formatAdxOptions = [
    ...formatOptions,
    { value: 'adx', label: i18n.t('ADX (XML)') },
]
const formatAdxXMLOptions = [
    ...formatOptions,
    { value: 'adx+xml', label: i18n.t('ADX (XML)') },
]
const formatAdxPdfOptions = [
    ...formatAdxOptions,
    { value: 'pdf', label: i18n.t('PDF') },
]
const formatJsonpOptions = [
    ...formatOptions,
    { value: 'jsonp', label: i18n.t('JSONP') },
]
const defaultFormatOption = formatOptions[0].value

const NAME = 'format'
const DATATEST = 'input-format'
const IMPORT_LABEL = i18n.t('What format is the data to import?')
const EXPORT_LABEL = i18n.t('What format should the data be exported as?')

const typeToLabel = (type) => (type === 'import' ? IMPORT_LABEL : EXPORT_LABEL)

const Format = ({ availableFormats, type }) => (
    <RadioGroupField
        name={NAME}
        label={typeToLabel(type)}
        options={availableFormats}
        dataTest={DATATEST}
    />
)

Format.propTypes = {
    availableFormats: optionsPropType.isRequired,
    type: PropTypes.oneOf(['import', 'export']),
}

export {
    Format,
    formatOptions,
    formatNoCsvOptions,
    formatNoXmlOptions,
    formatNoXmlNoCsvOptions,
    formatAdxOptions,
    formatAdxXMLOptions,
    formatAdxPdfOptions,
    formatJsonpOptions,
    defaultFormatOption,
}
