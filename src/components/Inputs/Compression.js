import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const compressionOptions = [
    { value: 'zip', label: i18n.t('Zip') },
    { value: 'gz', label: i18n.t('GZip') },
    { value: '', label: i18n.t('Uncompressed') },
]
const defaultCompressionOption = compressionOptions[0]

const NAME = 'compression'
const DATATEST = 'input-compression'
const LABEL = i18n.t('Compression')

const Compression = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={compressionOptions}
        dataTest={DATATEST}
    />
)

export { Compression, defaultCompressionOption }
