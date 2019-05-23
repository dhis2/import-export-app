import React from 'react'
import { CircularProgress } from 'material-ui'
import s from './styles.module.css'
import Progress from './Progress'

export function Loading({ size, thickness }) {
    return (
        <div className={s.container}>
            <CircularProgress size={size || 80} thickness={thickness || 3} />
        </div>
    )
}

export { Progress }
