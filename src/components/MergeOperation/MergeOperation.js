import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'

const mergeOperation = 'REPLACE'

const MERGE_NOTICE_TITLE = i18n.t(
    'All existing property values will be replaced'
)
const MERGE_NOTICE_TEXT = i18n.t(
    'Values will be overwritten, even if the new value is null'
)

const MergeOperationNotice = () => {
    return (
        <div style={{ maxWidth: '80%' }}>
            <NoticeBox
                dataTest={'merge-operation-notice'}
                title={MERGE_NOTICE_TITLE}
            >
                {MERGE_NOTICE_TEXT}
            </NoticeBox>
        </div>
    )
}

export { mergeOperation, MergeOperationNotice }
