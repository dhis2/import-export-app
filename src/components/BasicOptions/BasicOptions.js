import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './BasicOptions.module.css'

const LABEL = i18n.t('Basic options')
const BasicOptions = ({ children }) => {
    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.label}>{LABEL}</h2>
                <Divider />
            </header>
            {children}
        </section>
    )
}

BasicOptions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
}

export { BasicOptions }
