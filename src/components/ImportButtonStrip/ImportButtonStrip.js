import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, Help } from '@dhis2/ui-core'

import s from './ImportButtonStrip.module.css'
import { helpText } from '../../utils/text'

const ImportButtonStrip = ({
    onSubmit,
    dryRunDataTest,
    importDataTest,
    dataTest,
}) => {
    return (
        <div data-test={dataTest}>
            <ButtonStrip dataTest={`${dataTest}-button-strip`}>
                <Button
                    primary
                    onClick={() => onSubmit({ dryRun: true })}
                    dataTest={dryRunDataTest}
                    className={s.dryRun}
                >
                    {i18n.t('Dry run')}
                </Button>
                <Button
                    secondary
                    onClick={() => onSubmit({ dryRun: false })}
                    dataTest={importDataTest}
                >
                    {i18n.t('Import')}
                </Button>
            </ButtonStrip>
            <Help dataTest={`${dataTest}-help`}>{`${i18n.t('Dry run')}: ${
                helpText.dryRun
            }`}</Help>
        </div>
    )
}

ImportButtonStrip.propTypes = {
    dataTest: PropTypes.string.isRequired,
    dryRunDataTest: PropTypes.string.isRequired,
    importDataTest: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export { ImportButtonStrip }
