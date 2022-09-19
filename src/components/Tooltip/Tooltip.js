import { Tooltip as UiTooltip } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Tooltip.module.css'

const Tooltip = ({ disabled, content, children }) => (
    <UiTooltip
        content={content}
        openDelay={200}
        closeDelay={100}
        placement="right"
    >
        {({ onMouseOver, onMouseOut, ref }) => (
            <span
                className={cx(styles.span, disabled && styles.disabled)}
                onMouseOver={() => disabled && onMouseOver()}
                onMouseOut={() => disabled && onMouseOut()}
                ref={ref}
            >
                {children}
            </span>
        )}
    </UiTooltip>
)

Tooltip.propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    disabled: PropTypes.bool,
}

export { Tooltip }
