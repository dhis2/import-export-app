import { MenuSectionHeader as UIHeader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './MenuSectionHeader.module.css'

const MenuSectionHeader = ({ label, children }) => (
    <UIHeader
        className={styles.sectionTitle}
        label={
            <span className={styles.label}>
                <span className={styles.icon}>{children}</span>
                {label}
            </span>
        }
        hideDivider
    />
)

MenuSectionHeader.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
}

export { MenuSectionHeader }
