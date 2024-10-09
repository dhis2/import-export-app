import i18n from '@dhis2/d2-i18n'
import { Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { jsDateToString } from '../../../utils/helper.js'
import styles from './MenuLabel.module.css'

const MenuLabel = ({ task }) => {
    return (
        <div
            className={styles.container}
            data-test={`job-overview-menu-label-${task.id}`}
        >
            <div className={styles.filename}>
                {task.jobDetails.files[0].name}
            </div>
            <div className={styles.subtitle}>
                {task.completed ? (
                    <Tag positive>{i18n.t('Completed')}</Tag>
                ) : (
                    <Tag>{i18n.t('In progress')}</Tag>
                )}{' '}
                <p className={styles.date}>{jsDateToString(task.created)}</p>
            </div>
        </div>
    )
}

MenuLabel.propTypes = {
    task: PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
        jobDetails: PropTypes.object.isRequired,
    }).isRequired,
}

export { MenuLabel }
