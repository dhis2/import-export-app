import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import s from './MenuLabel.module.css'
import { jsDateToString, trimString } from '../../../utils/helper'
import { testIds } from '../../../utils/testIds'

const MenuLabel = ({ task }) => {
    return (
        <div
            className={s.container}
            data-test={`${testIds.JobOverview.MenuLabel}-${task.id}`}
        >
            <div>
                <span>{trimString(15, task.jobDetails.file.name)}</span>
                <br />
                <span>
                    {task.completed
                        ? i18n.t('Completed')
                        : i18n.t('In progress')}{' '}
                </span>
            </div>
            <div className={s.date}>{jsDateToString(task.created)}</div>
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
