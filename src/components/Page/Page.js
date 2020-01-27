import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CircularLoader,
    ComponentCover,
    LinearLoader,
} from '@dhis2/ui-core'

import s from './Page.module.css'

const Page = ({ title, desc, icon, children, loading = false, dataTest }) => {
    const loadingEl =
        typeof loading == 'number' ? (
            <LinearLoader amount={loading} />
        ) : (
            <CircularLoader />
        )

    return (
        <div className={s.container} data-test={dataTest}>
            <div className={s.header}>
                <span className={s.icon}>{icon}</span>
                <span className={s.title}>{title}</span>
                <p className={s.desc}>{desc}</p>
            </div>
            <Card>
                {!!loading && <ComponentCover>{loadingEl}</ComponentCover>}
                <div className={s.content}>{children}</div>
            </Card>
        </div>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export { Page }
