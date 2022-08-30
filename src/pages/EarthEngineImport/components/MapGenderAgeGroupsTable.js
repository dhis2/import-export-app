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
import React, { useState, useEffect } from 'react'
import { FieldArray } from 'react-final-form-arrays'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import {
    getEarthEngineConfigs,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines.js'
import { BAND_COCS } from '../util/formFieldConstants.js'

const { Field, useFormState } = ReactFinalForm

const internalBands = [
    {
        id: 'M_0',
        name: i18n.t('Men 0 - 1 years'),
    },
    {
        id: 'M_1',
        name: i18n.t('Men 1 - 4 years'),
    },
    {
        id: 'M_5',
        name: i18n.t('Men 5 - 9 years'),
    },
]

const MappingTable = ({ formChange, push, pop }) => {
    const { values } = useFormState()
    const { dataElements } = useCachedDataQuery()
    const [cocs, setCocs] = useState([])
    const { earthEngineId, dataElementId, bandCocs } = values

    // const clearBandCocs = useCallback(
    // fields.update
    // () => bands.forEach(({ id }) => formChange(id, undefined)),
    // [formChange, bands]
    // )

    useEffect(() => {
        internalBands.forEach((band) => {
            push(BAND_COCS, {
                bandId: band.id,
                bandName: band.name,
                coc: '',
            })
        })
    }, [push])

    useEffect(() => {
        if (dataElementId) {
            const newCocs = dataElements.find(({ id }) => id === dataElementId)
                .categoryCombo.categoryOptionCombos

            // clearBandCocs()
            setCocs(newCocs)
        }
    }, [dataElementId, dataElements])

    if (earthEngineId !== POPULATION_AGE_GROUPS_DATASET_ID || !dataElementId) {
        return null
    }

    const getCatComboOptions = () => {
        const unavailableCocs = bandCocs
            .filter((bcoc) => bcoc.coc)
            .map((bcoc) => bcoc.coc)

        return cocs.map(({ id, name }) => {
            return {
                value: id,
                label: name,
                disabled: unavailableCocs.indexOf(id) !== -1,
            }
        })
    }
    const catComboOptions = getCatComboOptions()

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
                    <FieldArray name={BAND_COCS}>
                        {({ fields }) =>
                            fields.map((name, index) => (
                                <TableRow key={`row-${index}`}>
                                    <TableCell dense>
                                        {fields.value[index].bandId}
                                    </TableCell>
                                    <TableCell dense>
                                        {fields.value[index].bandName}
                                    </TableCell>
                                    <TableCell dense>
                                        <Field
                                            component={SingleSelectFieldFF}
                                            name={`${name}.coc`}
                                            inputWidth="250px"
                                            filterable
                                            clearable
                                            noMatchText={i18n.t(
                                                'No match found'
                                            )}
                                            placeholder={i18n.t(
                                                'Choose category option combo'
                                            )}
                                            options={catComboOptions}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </FieldArray>
                </TableBody>
            </Table>
        </>
    )
}

MappingTable.propTypes = {
    formChange: PropTypes.func,
}

export { MappingTable }
