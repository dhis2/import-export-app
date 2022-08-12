import PropTypes from 'prop-types'
import React from 'react'
import { ImportButtonStrip } from '../../../components/Inputs/index.js'

const SubmitButtons = ({
    modifiedSinceLastPreview,
    fetching,
    hasData,
    form,
}) => {
    // form is invalidated
    if (modifiedSinceLastPreview) {
        return null
    }

    // there is no data to import
    if (!hasData) {
        return null
    }

    // fetching is happening
    if (fetching) {
        return null
    }
    return <ImportButtonStrip form={form} />
}

SubmitButtons.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    hasData: PropTypes.bool,
    modifiedSinceLastPreview: PropTypes.bool,
}

export { SubmitButtons }
