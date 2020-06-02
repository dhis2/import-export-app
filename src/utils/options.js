import PropTypes from 'prop-types'

const optionPropType = PropTypes.exact({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
})

const optionsPropType = PropTypes.arrayOf(optionPropType)

export { optionPropType, optionsPropType }
