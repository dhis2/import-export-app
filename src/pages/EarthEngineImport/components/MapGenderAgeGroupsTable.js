// import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    NoticeBox,
    // Button,
} from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { getEarthEngineConfigs } from '../util/earthEngines.js'
import { MappingTableRow } from './MappingTableRow.js'

const { useField } = ReactFinalForm

const MappingTable = () => {
    const { input: eeInput } = useField('earthEngineId')
    const { value: earthEngineId } = eeInput
    const { input: deInput } = useField('dataElements')
    const { value: dataElementId } = deInput

    const [bands, setBands] = useState(undefined)
    const [completeRows, setCompleteRows] = useState({})
    const [cocIdsSelected, setCocIdsSelected] = useState([])

    const { dataElements } = useCachedDataQuery()
    const { input: categoryInput } = useField('dataElementCategory')
    const { value: categoryId } = categoryInput

    useEffect(() => {
        setBands(getEarthEngineConfigs(earthEngineId)?.bands)
    }, [earthEngineId])

    // useEffect(() => {
    //     if (dataElementId) {
    //         engine.query(categoryOptionCombosQuery, {
    //             variables: {
    //                 id: dataElementId,
    //             },
    //             onComplete: ({ data }) => {
    //                 setCatOptComboList(
    //                     data.categoryCombo.categories[0].categoryOptions
    //                 )
    //             },
    //             onError: error => {
    //                 // setError(error)
    //                 console.error('categoryOptionCombos error: ', error)
    //             },
    //         })
    //     }
    // }, [dataElementId])

    if (!bands || !dataElementId || !categoryId) {
        return null
    }

    const catOptComboList = dataElements
        .find(({ id }) => id === dataElementId)
        .categoryCombo.categories.find(({ id }) => id === categoryId)
        .categoryOptions.map(({ id, name }) => {
            return {
                value: id,
                label: name,
            }
        })

    const cocSelected = ({ bandId, cocId }) => {
        setCompleteRows({ ...completeRows, [bandId]: cocId })
        const prevCocIds = Object.values(completeRows).map(({ cocId }) => cocId)
        setCocIdsSelected([...prevCocIds, cocId])
    }

    return (
        <>
            <NoticeBox
                title={i18n.t('Import bands to category option combinations')}
            >
                {i18n.t(
                    'Earth Engine data set "Population age groups" has disaggregation bands. Choose the category option combinations to import each band into.'
                )}
            </NoticeBox>
            <Table dense>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead dense>
                            {i18n.t('Band name')}
                        </TableCellHead>
                        <TableCellHead dense>
                            {i18n.t('Band description')}
                        </TableCellHead>
                        <TableCellHead dense>
                            {i18n.t('Category option combination')}
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {bands.map(({ id, name }) => {
                        return (
                            <MappingTableRow
                                key={id}
                                bandId={id}
                                bandName={name}
                                selected={completeRows[id]}
                                setSelected={cocSelected}
                                catOptComboList={catOptComboList}
                                cocIdsSelected={cocIdsSelected}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export { MappingTable }
