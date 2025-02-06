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
import React, { useState, useEffect } from 'react'
import { FieldArray } from 'react-final-form-arrays'
import { useCachedDataQuery } from '../util/CachedQueryProvider.jsx'
import { getEarthEngineBands } from '../util/earthEngines.js'
import { BAND_COCS } from '../util/formFieldConstants.js'
import styles from './styles/BandCocMappingTable.module.css'

const { Field, useFormState, useForm } = ReactFinalForm

const BandCocMappingTable = () => {
    const { values } = useFormState()
    const { change } = useForm()
    const { dataElements } = useCachedDataQuery()
    const [cocs, setCocs] = useState([])
    const { earthEngineId, dataElementId, bandCocs } = values

    useEffect(() => {
        //clear form bandCocs when this component is removed
        return function cleanup() {
            change(BAND_COCS, [])
        }
    }, [change])

    // dataElementId is a dependency because if it changes then
    // the BAND_COCS mapping is no longer valid. The mapped
    // cocs are specific to the dataElementId.
    useEffect(() => {
        const dataSetBands = getEarthEngineBands(earthEngineId)
        change(BAND_COCS, dataSetBands)
    }, [earthEngineId, dataElementId, change])

    useEffect(() => {
        const newCocs = dataElements.find(({ id }) => id === dataElementId)
            .categoryCombo.categoryOptionCombos

        setCocs(newCocs)
    }, [dataElementId, dataElements])

    const getCatComboOptions = () => {
        const unavailableCocs = bandCocs
            ? bandCocs.filter((bcoc) => bcoc.coc).map((bcoc) => bcoc.coc)
            : []

        return cocs.map(({ id, name }) => {
            return {
                value: id,
                label: name,
                disabled: unavailableCocs.indexOf(id) !== -1,
            }
        })
    }

    const getProbableCocMatch = (bandId) => {
        const probableCoc = cocs.find((coc) => coc.code === bandId)

        return probableCoc?.id || null
    }

    const catComboOptions = getCatComboOptions()

    return (
        <div className={styles.container}>
            <div className={styles.noticeBox}>
                <NoticeBox
                    title={i18n.t(
                        'Import groups to category option combinations'
                    )}
                >
                    {i18n.t(
                        'Earth Engine data set "Population age groups" has disaggregation groups. Choose the category option combinations to import each group into.'
                    )}
                </NoticeBox>
            </div>
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
                            fields.map((name, i) => {
                                return (
                                    <TableRow key={`row-${i}`}>
                                        <TableCell dense>
                                            {fields.value[i].id}
                                        </TableCell>
                                        <TableCell dense>
                                            {fields.value[i].name}
                                        </TableCell>
                                        <TableCell dense>
                                            <Field
                                                component={SingleSelectFieldFF}
                                                name={`${name}.coc`}
                                                inputWidth="250px"
                                                filterable
                                                clearable
                                                defaultValue={getProbableCocMatch(
                                                    fields.value[i].id
                                                )}
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
                                )
                            })
                        }
                    </FieldArray>
                </TableBody>
            </Table>
        </div>
    )
}

export { BandCocMappingTable }
