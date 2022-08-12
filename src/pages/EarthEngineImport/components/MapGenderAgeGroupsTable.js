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
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import {
    getEarthEngineConfigs,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from '../util/earthEngines.js'

const { Field, useFormState } = ReactFinalForm

const MappingTable = () => {
    const { values } = useFormState()
    const { dataElements } = useCachedDataQuery()

    const {
        earthEngineId,
        dataElement: dataElementId,
        organisationUnits, //eslint-disable-line no-unused-vars
        rounding, //eslint-disable-line no-unused-vars
        period, //eslint-disable-line no-unused-vars
        aggregationType, //eslint-disable-line no-unused-vars
        ...bandCocs
    } = values

    if (earthEngineId !== POPULATION_AGE_GROUPS_DATASET_ID || !dataElementId) {
        return null
    }

    const bands = getEarthEngineConfigs(earthEngineId)?.bands

    const cocs = dataElements.find(({ id }) => id === dataElementId)
        .categoryCombo.categoryOptionCombos

    if (!bands) {
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
    // TODO - this is a temporary function to make testing quicker
    const getProbableCocMatch = (bandId) => {
        // bandId F_1 = coc Female, 1 - 4 yr
        const [bandGender, bandAge] = bandId.split('_')

        const probableCoc = cocs.find((coc) => {
            const [cocGender, cocAge] = coc.name.split(',')
            if (cocAge === undefined) {
                return false
            }

            const ageGrp =
                cocAge.includes('<12m') || cocAge.includes('<1y')
                    ? '0'
                    : cocAge.trim().split(' ')[0]

            return cocGender.charAt(0) === bandGender && ageGrp === bandAge
        })

        return probableCoc?.id || null
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
                                    <Field
                                        component={SingleSelectFieldFF}
                                        name={bandId}
                                        inputWidth="250px"
                                        filterable
                                        clearable
                                        defaultValue={getProbableCocMatch(
                                            bandId
                                        )}
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
