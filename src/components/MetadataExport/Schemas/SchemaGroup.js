import React from 'react';
import { Checkbox } from '@dhis2/ui-core';

import s from './Schemas.module.css';

const SchemaGroup = ({ label, schemas, toggleSchema }) => (
    <div className={s.group}>
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
);

export { SchemaGroup };
