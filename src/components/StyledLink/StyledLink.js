import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './StyledLink.module.css'

const StyledLink = ({ dataTest, ...passThroughProps }) => (
    <Link data-test={dataTest} className={styles.link} {...passThroughProps} />
)

StyledLink.propTypes = {
    dataTest: PropTypes.string.isRequired,
}

export { StyledLink }
