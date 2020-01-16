import { useField } from 'react-final-form'
import { Help } from '@dhis2/ui-core'
import React, { useRef, useCallback } from 'react'
import propTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import styles from './File.module.css'

const FileUploadIcon = () => (
    <svg className={styles.svg}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
)

export const File = ({ name, dataTest }) => {
    const ref = useRef()
    const { input, meta } = useField(name, {
        type: 'file',
        parse: () => ref.current.files[0],
        validate: value => (!!value ? undefined : i18n.t('Required')),
    })
    const onClick = useCallback(() => {
        ref.current.click()
    }, [ref])

    const { value, ...withoutValue } = input
    const label = value ? value.name : i18n.t('Choose a file to upload') + ' *'

    return (
        <div className={styles.container} data-test={dataTest}>
            <input {...withoutValue} ref={ref} className={styles.input} />

            <button type="button" onClick={onClick} className={styles.button}>
                <FileUploadIcon />
                <span className={styles.label}>{label}</span>
            </button>

            {meta.touched && meta.error && (
                <div className={styles.error}>
                    <Help error>{meta.error}</Help>
                </div>
            )}
        </div>
    )
}

File.propTypes = {
    name: propTypes.string,
}
