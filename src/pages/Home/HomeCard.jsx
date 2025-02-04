import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HomeCard.module.css'

const HomeCard = ({ titleText, bodyText, linkText, to }) => {
    return (
        <Link className={styles.link} to={to}>
            <div className={styles.container}>
                <h2 className={styles.title}>{titleText}</h2>
                <p className={styles.body}>{bodyText}</p>
                <div className={styles.linkText}>{linkText}</div>
            </div>
        </Link>
    )
}

HomeCard.propTypes = {
    bodyText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

export { HomeCard }
