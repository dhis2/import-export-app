import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'

const DATATEST = 'input-export-submit'

const ExportButton = ({ label }) => (
    <div style={{ marginBottom: 'var(--spacers-dp24)' }}>
        <Button primary type="submit" dataTest={DATATEST}>
            {label}
        </Button>
    </div>
)

ExportButton.propTypes = {
    label: PropTypes.string.isRequired,
}

export { ExportButton }
