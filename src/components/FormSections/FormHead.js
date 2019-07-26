import React from 'react'
import styles from './FormHead.module.css'

export const FormHead = ({ icon, label }) => (
    <div className={styles.container}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
    </div>
)
