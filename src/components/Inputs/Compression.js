import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_ZIP = { value: 'zip', label: i18n.t('Zip') }
export const OPTION_GZIP = { value: 'gz', label: i18n.t('GZip') }
export const OPTION_NONE = { value: '', label: i18n.t('Uncompressed') }

export const COMPRESSION_KEY = 'compression'
export const COMPRESSION_DEFAULT_VALUE = OPTION_ZIP.value

export const Compression = () => (
    <RadioGroup
        name={COMPRESSION_KEY}
        label={i18n.t('Compression')}
        options={[OPTION_ZIP, OPTION_GZIP, OPTION_NONE]}
        dataTest="input-compression"
    />
)
