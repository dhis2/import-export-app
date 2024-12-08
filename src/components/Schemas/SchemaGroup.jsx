import { Checkbox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Schemas.module.css'

const SchemaGroup = ({ label, schemas, toggleSchema, dataTest }) => (
    <div className={styles.group} data-test={dataTest}>
        <span className={styles.formLabel}>{label}</span>
        <div className={styles.schema}>
            {schemas.map((schema, ind) => (
                <div className={styles.control} key={schema.name}>
                    <Checkbox
                        label={schema.label}
                        name={`schemas.${schema.name}`}
                        value={`schemas.${schema.name}`}
                        checked={schema.checked}
                        onChange={() => toggleSchema(ind)}
                    />
                </div>
            ))}
        </div>
    </div>
)

SchemaGroup.propTypes = {
    label: PropTypes.string.isRequired,
    schemas: PropTypes.arrayOf(
        PropTypes.exact({
            checked: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            group: PropTypes.string.isRequired,
        })
    ).isRequired,
    toggleSchema: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
}

export { SchemaGroup }
