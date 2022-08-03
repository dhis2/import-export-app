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
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import {
    getEarthEngineConfigs,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines.js'

const { useFormState } = ReactFinalForm

const MappingTable = () => {
    const { values } = useFormState()
    /* eslint-disable no-unused-vars */
    const {
        earthEngineId,
        dataElement: dataElementId,
        organisationUnits, //not used
        rounding, //not used
        period, //not used
        aggregationType, //not used
        ...usedCocs
    } = values
    /* eslint-enable no-unused-vars */

    const { dataElements } = useCachedDataQuery()

    if (earthEngineId !== POPULATION_AGE_GROUPS_DATASET_ID || !dataElementId) {
        return null
    }

    const bands = getEarthEngineConfigs(earthEngineId)?.bands

    if (!bands) {
        return null
    }

    const getCatComboOptions = (bandId) => {
        const unavailableCocs = Object.entries(usedCocs)
            .filter((entry) => entry[0] !== bandId)
            .map((entry) => entry[1])

        return dataElements
            .find(({ id }) => id === dataElementId)
            .categoryCombo.categoryOptionCombos.map(({ id, name }) => {
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
                    {bands.map(({ id: bandId, name }) => {
                        return (
                            <TableRow key={`row-${bandId}`}>
                                <TableCell dense>{bandId}</TableCell>
                                <TableCell dense>{name}</TableCell>
                                <TableCell dense>
                                    <StyledField
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

export { MappingTable }
