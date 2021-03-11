import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, Help } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ImportButtonStrip.module.css'
const DRYRUN_HELPTEXT = i18n.t(
    'A dry run tests the import settings without importing any data'
)

const ImportButtonStrip = ({
    dryRunDataTest,
    importDataTest,
    form,
    dataTest,
}) => {
    return (
        <div className={styles.container} data-test={dataTest}>
            <ButtonStrip dataTest={`${dataTest}-button-strip`}>
                <Button
                    primary
                    type="submit"
                    onClick={() => form.change('dryRun', true)}
                    dataTest={dryRunDataTest}
                    className={styles.dryRun}
                >
                    {i18n.t('Start dry run')}
                </Button>
                <Button
                    secondary
                    type="submit"
                    onClick={() => form.change('dryRun', false)}
                    dataTest={importDataTest}
                >
                    {i18n.t('Start import')}
                </Button>
            </ButtonStrip>
            <Help dataTest={`${dataTest}-help`}>{DRYRUN_HELPTEXT}</Help>
        </div>
    )
}

ImportButtonStrip.propTypes = {
    dataTest: PropTypes.string.isRequired,
    dryRunDataTest: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    importDataTest: PropTypes.string.isRequired,
}

export { ImportButtonStrip }
