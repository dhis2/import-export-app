import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui-core'

const DATATEST = 'input-export-submit'
const LABEL = i18n.t('Export')

const ExportButton = () => (
    <Button primary type="submit" dataTest={DATATEST}>
        {LABEL}
    </Button>
)

export { ExportButton }
