import React from 'react'
import styles from './FormContent.module.css'

export const FormContent = ({ children }) => (
    <div className={styles.container}>{children}</div>
)
