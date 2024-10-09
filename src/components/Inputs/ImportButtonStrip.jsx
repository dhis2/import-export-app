import PropTypes from 'prop-types'
import React from 'react'
import { ImportButtonStrip as ImportButtonStripGeneric } from '../index.js'

const DRYRUNDATATEST = 'input-dry-run'
const IMPORTDATATEST = 'input-import-submit'
const DATATEST = 'input-import-button-strip'

const ImportButtonStrip = ({ form }) => (
    <ImportButtonStripGeneric
        form={form}
        dryRunDataTest={DRYRUNDATATEST}
        importDataTest={IMPORTDATATEST}
        dataTest={DATATEST}
    />
)

ImportButtonStrip.propTypes = {
    form: PropTypes.object.isRequired,
}

export { ImportButtonStrip }
