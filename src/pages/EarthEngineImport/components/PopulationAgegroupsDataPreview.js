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
    ReactFinalForm,
    Tag,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import styles from './styles/DataPreview.module.css'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const DEFAULT_ROWS_PER_PAGE = 10

const { useFormState } = ReactFinalForm

const PopulationAgegroupsDataPreview = ({ eeData, pointOuRows }) => {
    const { values } = useFormState()
    const { dataElementId, bandCocs } = values
    const [tableData, setTableData] = useState([])
    const { dataElements } = useCachedDataQuery()
    const { currentValues } = useFetchCurrentValues()
    const [pageNo, setPageNo] = useState(1)
    const [visibleRows, setVisibleRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    const tableRef = useRef(null)

    const bandCocMap = useMemo(() => {
        return bandCocs.reduce((acc, curr) => {
            acc[curr.bandId] = curr
            return acc
        }, {})
    }, [bandCocs])

    const cocMap = useMemo(() => {
        const cocs =
            dataElements.find(({ id }) => id === dataElementId).categoryCombo
                ?.categoryOptionCombos || []

        return cocs.reduce((acc, curr) => {
            acc[curr.id] = curr
            return acc
        }, {})
    }, [dataElementId, dataElements])

    useEffect(() => {
        if (eeData) {
            const newArr = eeData
                .map((d) => {
                    const cocId = bandCocMap[d.bandId]?.coc

                    const current = currentValues
                        .filter((v) => v.orgUnit === d.ouId)
                        .find((v) => v.categoryOptionCombo === cocId)

                    return {
                        categoryOptionCombo: cocMap[cocId]?.name,
                        current: current?.value,
                        ...d,
                    }
                })
                .concat(
                    pointOuRows.map(({ id, name }) => ({
                        ouId: id,
                        ouName: name,
                        value: i18n.t('Point org. unit - no value'),
                        isNoValue: true,
                    }))
                )

            setTableData(newArr)
        }
    }, [currentValues, eeData, pointOuRows, bandCocMap, cocMap])

    useEffect(() => {
        tableRef?.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [tableData, tableRef])

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

    const updateTable = (newRowsPerPage) => {
        setPageNo(1)
        setRowsPerPage(newRowsPerPage)
    }

    const getNumPages = () => Math.ceil(tableData.length / rowsPerPage)
    const isLastPage = () => pageNo === getNumPages()
    const getLastPageLength = () => tableData.length % rowsPerPage

    return (
        <div ref={tableRef}>
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
                            {
                                ouId,
                                ouName,
                                categoryOptionCombo,
                                value,
                                current,
                                isNoValue,
                            },
                            i
                        ) => {
                            return (
                                <DataTableRow key={`${ouId}-${i}`}>
                                    <DataTableCell dense>
                                        {ouName}
                                    </DataTableCell>
                                    <DataTableCell dense>
                                        {categoryOptionCombo}
                                    </DataTableCell>
                                    <DataTableCell dense>
                                        <span className={styles.current}>
                                            {current || ''}
                                        </span>
                                    </DataTableCell>
                                    <DataTableCell
                                        dense
                                        className={styles.right}
                                    >
                                        {isNoValue ? (
                                            <Tag negative>{value}</Tag>
                                        ) : (
                                            <span>{value}</span>
                                        )}
                                    </DataTableCell>
                                </DataTableRow>
                            )
                        }
                    )}
                </DataTableBody>
                <DataTableFoot>
                    <DataTableRow>
                        <DataTableCell staticStyle colSpan={'4'}>
                            <div>
                                <Pagination
                                    // disabled={fetching}
                                    page={pageNo}
                                    isLastPage={isLastPage()}
                                    onPageChange={setPageNo}
                                    onPageSizeChange={updateTable}
                                    pageSize={rowsPerPage}
                                    pageSizeSelectText={i18n.t(
                                        'Select rows per page'
                                    )}
                                    total={tableData.length}
                                    pageLength={
                                        isLastPage()
                                            ? getLastPageLength()
                                            : null
                                    }
                                    pageCount={getNumPages()}
                                />
                            </div>
                        </DataTableCell>
                    </DataTableRow>
                </DataTableFoot>
            </DataTable>
        </div>
    )
}

PopulationAgegroupsDataPreview.propTypes = {
    eeData: PropTypes.array,
    pointOuRows: PropTypes.array,
}

export { PopulationAgegroupsDataPreview }
