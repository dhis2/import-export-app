import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ValidationSummary.module.css'

const { useFormState } = ReactFinalForm

const transformErrors = (errors) =>
    Object.entries(errors)
        .map(([key, value]) => ({
            name: key,
            label: value,
        }))
        .filter((error) => error.label)

const Error = ({ label }) => <li>{label}</li>

Error.propTypes = { label: PropTypes.string.isRequired }

const ValidationSummary = () => {
    const { errors, submitFailed } = useFormState()
    const errorList = transformErrors(errors)

    if (!submitFailed || !errorList.length) {
        return null
    }

    return (
        <NoticeBox
            title={i18n.t('There are errors on this page')}
            className={styles.container}
            error
        >
            <ul className={styles.errors}>
                {errorList.map(({ name, label }) => (
                    <Error key={name} label={label} />
                ))}
            </ul>
        </NoticeBox>
    )
}

export { ValidationSummary }
