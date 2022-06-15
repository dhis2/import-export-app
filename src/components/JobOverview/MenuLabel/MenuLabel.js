import i18n from '@dhis2/d2-i18n'
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
            <div className={styles.status}>
                <span className={styles.filename}>
                    {task.jobDetails.files[0].name}
                </span>
                <br />
                <span>
                    {task.completed
                        ? i18n.t('Completed')
                        : i18n.t('In progress')}{' '}
                </span>
            </div>
            <div className={styles.date}>{jsDateToString(task.created)}</div>
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
