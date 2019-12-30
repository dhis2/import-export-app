import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_ZIP = { value: 'zip', label: i18n.t('Zip') }
export const OPTION_GZIP = { value: 'gz', label: i18n.t('GZip') }
export const OPTION_NONE = { value: null, label: i18n.t('Uncompressed') }

export const COMPRESSION_KEY = 'compression'
export const COMPRESSION_DEFAULT_VALUE = OPTION_ZIP.value

export const Compression = () => (
    <Field>
        <Label>{i18n.t('Compression')}</Label>
        <RadioGroup
            name={COMPRESSION_KEY}
            label={i18n.t('Compression')}
            options={[OPTION_ZIP, OPTION_GZIP, OPTION_NONE]}
            dataTest="input-compression"
        />
    </Field>
)
