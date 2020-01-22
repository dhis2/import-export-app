import React from 'react'

import { Field } from '../Field/Field'
import { File } from '../FinalFormComponents/File'

export const Upload = () => (
    <Field>
        <File name="upload" dataTest="input-upload" />
    </Field>
)
