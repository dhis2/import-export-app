import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../index.js'

const DATATEST = 'input-dates'

const Dates = ({ label, show, children }) => {
    return (
        show && (
            <FormField label={label} dataTest={DATATEST}>
                <div style={{ display: 'flex' }}>
                    {children[0]}
                    <span style={{ marginLeft: 'var(--spacers-dp8)' }}>
                        {children[1]}
                    </span>
                </div>
            </FormField>
        )
    )
}

Dates.defaultProps = {
    label: '',
    show: true,
}

Dates.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    show: PropTypes.bool,
}

export { Dates }
