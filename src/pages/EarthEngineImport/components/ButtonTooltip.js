import { Tooltip as UiTooltip } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import classes from './styles/ButtonTooltip.module.css'

const Tooltip = ({ disabled, content, children }) => {
    return (
        <UiTooltip content={content} openDelay={200} closeDelay={100}>
            {({ onMouseOver, onMouseOut, ref }) => (
                <span
                    className={cx(classes.span, disabled && classes.disabled)}
                    onMouseOver={() => disabled && onMouseOver()}
                    onMouseOut={() => disabled && onMouseOut()}
                    ref={ref}
                >
                    {children}
                </span>
            )}
        </UiTooltip>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    disabled: PropTypes.bool,
}

Tooltip.defaultProps = {
    disabled: false,
}

export { Tooltip }
