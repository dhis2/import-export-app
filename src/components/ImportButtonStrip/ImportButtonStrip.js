import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, Help } from '@dhis2/ui-core'

import styles from './ImportButtonStrip.module.css'
import { helpText } from '../../utils/text'

const ImportButtonStrip = ({
    onImport,
    dryRunDataTest,
    importDataTest,
    dataTest,
}) => {
    return (
        <div data-test={dataTest}>
            <ButtonStrip dataTest={`${dataTest}-button-strip`}>
                <Button
                    primary
                    onClick={() => onImport({ dryRun: true })}
                    dataTest={dryRunDataTest}
                    className={styles.dryRun}
                >
                    {i18n.t('Dry run')}
                </Button>
                <Button
                    secondary
                    onClick={() => onImport({ dryRun: false })}
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
    onImport: PropTypes.func.isRequired,
}

export { ImportButtonStrip }
