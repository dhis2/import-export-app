import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@dhis2/ui-core'

import s from './Schemas.module.css'

const SchemaGroup = ({ label, schemas, toggleSchema, dataTest }) => (
    <div className={s.group} data-test={dataTest}>
        <span className={s.formLabel}>{label}</span>
        <div className={s.schema}>
            {schemas.map((schema, ind) => (
                <div key={schema.name}>
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
