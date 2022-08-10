import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableHead,
    DataTableBody,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
    DataTableFoot,
    Pagination,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import styles from './styles/DataPreview.module.css'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const DEFAULT_ROWS_PER_PAGE = 10

const PopulationAgegroupsDataPreview = (props) => {
    const { dataElementId, eeData } = props
    const [tableData, setTableData] = useState([])
    const { dataElements } = useCachedDataQuery()
    const { bandMap } = useCatOptComboSelections()
    const { currentValues } = useFetchCurrentValues()
    const [pageNo, setPageNo] = useState(1)
    const [visibleRows, setVisibleRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    useEffect(() => {
        if (currentValues && eeData) {
            const newArr = eeData.map(({ ouId, ouName, bandId, value }) => {
                const cocId = bandMap[bandId]

                const current = currentValues
                    .filter((v) => v.orgUnit === ouId)
                    .find((v) => v.categoryOptionCombo === cocId)

                // find the name of the cat option combo from dataElements
                const cocs =
                    dataElements.find(({ id }) => id === dataElementId)
                        .categoryCombo?.categoryOptionCombos || []

                const categoryOptionCombo = cocs.find(
                    (coc) => coc.id === cocId
                )?.name

                return {
                    ouId,
                    ouName,
                    categoryOptionCombo,
                    value,
                    current: current?.value,
                }
            })

            setTableData(newArr)
        }
    }, [currentValues, eeData, dataElementId])

    useEffect(() => {
        if (tableData.length) {
            const start = (pageNo - 1) * rowsPerPage
            const end = start + rowsPerPage

            const crows = tableData.slice(start, end)
            setVisibleRows(crows)
        }
    }, [tableData, rowsPerPage, pageNo])

    if (!tableData.length) {
        return null
    }

    const getNumPages = () => Math.ceil(tableData.length / rowsPerPage)
    const isLastPage = () => pageNo === getNumPages()
    const getLastPageLength = () => tableData.length % rowsPerPage

    return (
        <DataTable dense className={styles.table}>
            <DataTableHead>
                <DataTableRow>
                    <DataTableColumnHeader dense>
                        {i18n.t('Org Unit')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader dense>
                        {i18n.t('Category option combo')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader dense className={styles.right}>
                        {i18n.t('Current value')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader dense className={styles.right}>
                        {i18n.t('New value')}
                    </DataTableColumnHeader>
                </DataTableRow>
            </DataTableHead>
            <DataTableBody>
                {visibleRows.map(
                    (
                        { ouId, ouName, categoryOptionCombo, value, current },
                        i
                    ) => {
                        return (
                            <DataTableRow key={`${ouId}-${i}`}>
                                <DataTableCell dense>{ouName}</DataTableCell>
                                <DataTableCell dense>
                                    {categoryOptionCombo}
                                </DataTableCell>
                                <DataTableCell dense className={styles.current}>
                                    {current || ''}
                                </DataTableCell>
                                <DataTableCell dense className={styles.right}>
                                    {value}
                                </DataTableCell>
                            </DataTableRow>
                        )
                    }
                )}
            </DataTableBody>
            <DataTableFoot>
                <DataTableRow>
                    <DataTableCell staticStyle>
                        <div>
                            <Pagination
                                // disabled={fetching}
                                page={pageNo}
                                isLastPage={isLastPage()}
                                onPageChange={setPageNo}
                                onPageSizeChange={setRowsPerPage}
                                pageSize={rowsPerPage}
                                pageSizeSelectText={i18n.t(
                                    'Select rows per page'
                                )}
                                total={tableData.length}
                                pageLength={
                                    isLastPage() ? getLastPageLength() : null
                                }
                                pageCount={getNumPages()}
                            />
                        </div>
                    </DataTableCell>
                </DataTableRow>
            </DataTableFoot>
        </DataTable>
    )
}

PopulationAgegroupsDataPreview.propTypes = {
    dataElementId: PropTypes.string,
    eeData: PropTypes.array,
}

export { PopulationAgegroupsDataPreview }
