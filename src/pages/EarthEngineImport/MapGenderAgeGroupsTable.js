import { useDataEngine } from '@dhis2/app-runtime'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    SingleSelect,
    SingleSelectOption,
    // Button,
} from '@dhis2/ui'
import { getEarthEngineLayer } from './earthEngines.js'

const categoryOptionCombosQuery = {
    data: {
        resource: 'categoryOptionCombos',
        fields: 'id,name,displayName',
        params: {
            paging: 'true',
        },
    },
}

const MappingTable = ({ layerId }) => {
    const [bands, setBands] = useState([])
    const [cocs, setCocs] = useState([])
    const [completeRows, setCompleteRows] = useState({})
    const [cocIdsSelected, setCocIdsSelected] = useState([])
    const engine = useDataEngine()

    useEffect(() => {
        // get category option combos
        const bandsForLayer = getEarthEngineLayer(layerId)?.bands || []
        setBands(bandsForLayer)
    }, [layerId])

    useEffect(() => {
        engine.query(categoryOptionCombosQuery, {
            onComplete: data => {
                setCocs(data.data.categoryOptionCombos)
            },
            onError: error => {
                // setError(error)
                console.error('categoryOptionCombos error: ', error)
            },
        })
    }, [])

    if (!bands.length) {
        return null
    }

    const ccoChanged = row => {
        setCompleteRows({ ...completeRows, [row.id]: row })
        const prevCocIds = Object.values(completeRows).map(({ cocId }) => cocId)
        setCocIdsSelected([...prevCocIds, row.cocId])
    }

    return (
        <Table dense className={styles.table}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dense>{i18n.t('Band name')}</TableCellHead>
                    <TableCellHead dense>
                        {i18n.t('Band description')}
                    </TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('Category option combination')}
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {bands.map(band => {
                    const { id, name } = band

                    return (
                        <TableRow key={id}>
                            <TableCell dense>{id}</TableCell>
                            <TableCell dense className={styles.current}>
                                {name}
                            </TableCell>
                            <TableCell dense className={styles.right}>
                                <SingleSelect
                                    name="cocs"
                                    className={styles.eelayer}
                                    selected={completeRows[id]?.cocId || ''}
                                    onChange={({ selected }) =>
                                        ccoChanged({
                                            id,
                                            name,
                                            cocId: selected,
                                        })
                                    }
                                    inputWidth="150px"
                                    filterable
                                    noMatchText={i18n.t('No match found')}
                                >
                                    {cocs.map(({ id: ccoId, displayName }) => (
                                        <SingleSelectOption
                                            key={ccoId}
                                            value={ccoId}
                                            label={displayName}
                                            disabled={cocIdsSelected.includes(
                                                ccoId
                                            )}
                                        />
                                    ))}
                                </SingleSelect>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

MappingTable.propTypes = {
    layerId: PropTypes.string,
}

export default MappingTable
