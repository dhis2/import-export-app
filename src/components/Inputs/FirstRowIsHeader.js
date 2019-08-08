import { FormSpy } from 'react-final-form'
import React, { Fragment } from 'react'
import i18n from '@dhis2/d2-i18n'

import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const FIRST_ROW_IS_HEADER_KEY = 'firstRowIsHeader'
export const FIRST_ROW_IS_HEADER_DEFAULT_VALUE = OPTION_NO.value

export const FirstRowIsHeader = ({ show }) => (
    <Fragment>
        {show && (
            <RadioGroup
                name={FIRST_ROW_IS_HEADER_KEY}
                label={i18n.t('First row is header')}
                options={[OPTION_YES, OPTION_NO]}
                defaultValue={OPTION_NO.value}
            />
        )}

        <FormSpy
            render={({ values, form }) => {
                if (!show && values[FIRST_ROW_IS_HEADER_KEY]) {
                    form.change(FIRST_ROW_IS_HEADER_KEY, null)
                }

                return <Fragment />
            }}
        />
    </Fragment>
)
