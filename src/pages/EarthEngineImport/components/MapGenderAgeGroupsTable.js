import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    NoticeBox,
    SingleSelectFieldFF,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import {
    getEarthEngineConfigs,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines.js'
import {
    EARTH_ENGINE_ID,
    BAND_COCS,
    DATA_ELEMENT_ID,
    getFormValues,
} from '../util/getFormValues.js'

const { Field, useFormState } = ReactFinalForm

const NO_BANDS = []

const MappingTable = ({ formChange }) => {
    const { values } = useFormState()
    const { dataElements } = useCachedDataQuery()
    const [cocs, setCocs] = useState([])
    const { earthEngineId, dataElementId, ...bandCocs } = getFormValues(
        values,
        [EARTH_ENGINE_ID, DATA_ELEMENT_ID, BAND_COCS]
    )

    const bands = useMemo(
        () => getEarthEngineConfigs(earthEngineId)?.bands || NO_BANDS,
        [earthEngineId]
    )

    const resetSelectedCocs = useCallback(
        () => bands.forEach(({ id }) => formChange(id, undefined)),
        [formChange, bands]
    )

    useEffect(() => {
        if (dataElementId) {
            const newCocs = dataElements.find(({ id }) => id === dataElementId)
                .categoryCombo.categoryOptionCombos

            resetSelectedCocs()
            setCocs(newCocs)
        }
    }, [dataElementId, dataElements, resetSelectedCocs])

    if (
        earthEngineId !== POPULATION_AGE_GROUPS_DATASET_ID ||
        !dataElementId ||
        !bands
    ) {
        return null
    }

    const getCatComboOptions = (bandId) => {
        const unavailableCocs = Object.entries(bandCocs)
            .filter((entry) => entry[0] !== bandId)
            .map((entry) => entry[1])

        return cocs.map(({ id, name }) => {
            return {
                value: id,
                label: name,
                disabled: unavailableCocs.indexOf(id) !== -1,
            }
        })
    }

    return (
        <>
            <NoticeBox
                title={i18n.t('Import groups to category option combinations')}
            >
                {i18n.t(
                    'Earth Engine data set "Population age groups" has disaggregation groups. Choose the category option combinations to import each group into.'
                )}
            </NoticeBox>
            <Table dense>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead dense>
                            {i18n.t('Group name')}
                        </TableCellHead>
                        <TableCellHead dense>
                            {i18n.t('Group description')}
                        </TableCellHead>
                        <TableCellHead dense>
                            {i18n.t('Category option combination')}
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {bands.map(({ id: bandId, name }) => {
                        return (
                            <TableRow key={`row-${bandId}`}>
                                <TableCell dense>{bandId}</TableCell>
                                <TableCell dense>{name}</TableCell>
                                <TableCell dense>
                                    <Field
                                        component={SingleSelectFieldFF}
                                        name={bandId}
                                        inputWidth="250px"
                                        filterable
                                        clearable
                                        noMatchText={i18n.t('No match found')}
                                        options={getCatComboOptions(bandId)}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

MappingTable.propTypes = {
    formChange: PropTypes.func,
}

export { MappingTable }
