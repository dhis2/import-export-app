import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const DATATEST = 'input-export-submit'

const ExportButton = ({ label, disabledLabel, disabled }) => (
    <div style={{ marginBottom: 'var(--spacers-dp24)' }}>
        <Button primary type="submit" dataTest={DATATEST} disabled={disabled}>
            {disabled ? disabledLabel : label}
        </Button>
    </div>
)

ExportButton.defaultProps = {
    disabledLabel: i18n.t('Loading export...'),
}

ExportButton.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    disabledLabel: PropTypes.string,
}

export { ExportButton }
