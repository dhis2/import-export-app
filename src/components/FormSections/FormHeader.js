import React from 'react'
import styles from './FormHeader.module.css'

export const FormHeader = ({ icon, label }) => (
    <div className={styles.container}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
    </div>
)
