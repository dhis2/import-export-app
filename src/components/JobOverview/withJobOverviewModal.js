import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui-core'

import { testIds } from '../../utils/testIds'
import { TasksIcon } from '../Icon'
import { Fab } from '../Fab'
import { JobOverview, categoryTypes } from './JobOverview'

const allCategories = categoryTypes.map(({ importType }) => importType)

const withJobOverviewModal = Component => props => {
    const [showModal, setShowModal] = useState(false)
    const [activeTypes, setActiveTypes] = useState(allCategories)
    const [selectedJob, setSelectedJob] = useState(undefined)

    const onOpen = () => {
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal large onClose={onClose}>
                    <ModalTitle>{i18n.t('Job overview')}</ModalTitle>
                    <ModalContent>
                        <JobOverview
                            activeTypes={activeTypes}
                            setActiveTypes={setActiveTypes}
                            selectedJob={selectedJob}
                            setSelectedJob={setSelectedJob}
                        />
                    </ModalContent>
                    <ModalActions>
                        <Button destructive onClick={onClose}>
                            {i18n.t('Close')}
                        </Button>
                    </ModalActions>
                </Modal>
            )}
            <Component {...props} />
            <Fab
                onClick={onOpen}
                icon={<TasksIcon />}
                text={i18n.t('Job overview')}
                dataTest={testIds.App.overviewFab}
            />
        </>
    )
}

export { withJobOverviewModal }
