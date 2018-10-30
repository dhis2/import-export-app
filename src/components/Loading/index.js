import React from 'react'
import { CircularProgress } from 'material-ui'
import s from './styles.css'

export function Loading({ size, thickness }) {
    return (
        <div className={s.container}>
            <CircularProgress size={size || 80} thickness={thickness || 3} />
        </div>
    )
}
