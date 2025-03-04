import i18n from '@dhis2/d2-i18n'
import { InputField, ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

// (\d+d)?: one or more numbers followed by d; d for days
// rest of the capturing groups are similar to the one described above
const durationRegex = /^(\d+d)?(\d+h)?(\d+m)?(\d+s)?$/
const DURATION_VALIDATOR = (duration) =>
    !duration || duration.match(durationRegex)
        ? undefined
        : i18n.t('Invalid duration')

const formatHelpText = `${i18n.t('Format')}: 00d00h00m00s`
const exampleDuration = '100d5h30m'

const Wrapper = ({
    input: { value, onChange },
    meta: { error },
    inputName,
    label,
    dataTest,
}) => (
    <FormField label={label} dataTest={dataTest}>
        <InputField
            name={inputName}
            value={value}
            onChange={({ value }) => onChange(value)}
            inputWidth="200px"
            error={!!error}
            validationText={error}
            helpText={formatHelpText}
            placeholder={exampleDuration}
        />
    </FormField>
)

Wrapper.propTypes = {
    dataTest: PropTypes.string.isRequired,
    input: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string,
        ]),
        onChange: PropTypes.func,
    }).isRequired,
    inputName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
    }).isRequired,
}

const DurationField = ({ name, validator, ...rest }) => (
    <Field
        component={Wrapper}
        name={name}
        inputName={name}
        validate={validator}
        {...rest}
    />
)

DurationField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func.isRequired,
}

export { DurationField, DURATION_VALIDATOR }
