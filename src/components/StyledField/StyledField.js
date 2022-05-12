import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import styles from './StyledField.module.css'

const { Field } = ReactFinalForm

const StyledField = (props) => (
    <div className={styles.container}>
        <Field {...props} />
    </div>
)

export { StyledField }
