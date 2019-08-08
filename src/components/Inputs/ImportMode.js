import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'VALIDATE', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'COMMIT', label: i18n.t('No') }
export const IMPORT_MODE_KEY = 'importMode'
export const IMPORT_MODE_DEFAULT_VALUE = OPTION_NO.value

/**
 * This input is used only for meta data imports
 * It's supposed to look like the dry run option
 */
export const ImportMode = () => (
    <RadioGroup
        name={IMPORT_MODE_KEY}
        label={i18n.t('Dry run')}
        options={[OPTION_YES, OPTION_NO]}
    />
)
