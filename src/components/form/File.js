import { useField } from 'react-final-form'
import React, { Fragment, useRef, useCallback } from 'react'
import propTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import styles from './File.module.css'

const FileUploadIcon = () => (
    <svg className={styles.svg}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
)

export const File = ({ name }) => {
    const ref = useRef()
    const { input, meta } = useField(name, {
        type: 'file',
        parse: () => ref.current.files[0],
    })
    const onClick = useCallback(() => {
        ref.current.click()
    }, [ref])

    const { value, ...withoutValue } = input
    const label = value ? value.name : i18n.t('Choose a file to upload')

    return (
        <Fragment>
            <input {...withoutValue} ref={ref} className={styles.input} />

            <button onClick={onClick} className={styles.container}>
                <FileUploadIcon />
                <span className={styles.label}>{label}</span>
            </button>
        </Fragment>
    )
}

File.propTypes = {
    name: propTypes.string,
}
