import { SegmentedControl } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './GeometryFormat.module.css'

const geometryFormats = [
    {
        label: 'GeoJSON',
        value: 'geojson',
        path: '/import/geometry',
    },
    {
        label: 'GML',
        value: 'gml',
        path: '/import/gml',
    },
]

const GeometryFormat = ({ format = 'geojson' }) => {
    const history = useHistory()

    const onChange = ({ value }) => {
        if (value !== format) {
            const { path } = geometryFormats.find((f) => f.value === value)
            history.push(path)
        }
    }

    return (
        <div className={styles.geometryFormat}>
            <SegmentedControl
                options={geometryFormats}
                selected={format}
                onChange={onChange}
            />
        </div>
    )
}

GeometryFormat.propTypes = {
    format: PropTypes.string,
}

export { GeometryFormat }
