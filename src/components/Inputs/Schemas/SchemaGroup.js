import React from 'react'
import s from '../Schemas.module.css'
import { Checkbox } from '../../FinalFormComponents/Checkbox'

export const SchemaGroup = ({ label, schemas }) => (
    <div className={s.group}>
        <span className={s.formLabel}>{label}</span>
        <div className={s.schema}>
            {schemas.map(schema => (
                <div key={schema.name}>
                    <Checkbox
                        label={schema.label}
                        name={`schemas.${schema.name}`}
                        format={v => v.toString()}
                        parse={v => Boolean(v)}
                        initialValue="true"
                    />
                </div>
            ))}
        </div>
    </div>
)
