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
    Tag,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import styles from './styles/DataPreview.module.css'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const DEFAULT_ROWS_PER_PAGE = 10

const PopulationDataPreview = ({ eeData }) => {
    const [tableData, setTableData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const { currentValues } = useFetchCurrentValues()
    const [visibleRows, setVisibleRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
    const tableRef = useRef(null)

    useEffect(() => {
        if (eeData) {
            const newArr = eeData.map((d) => {
                const current = currentValues.find((v) => v.orgUnit === d.ouId)

                return { current: current?.value, ...d }
            })

            setTableData(newArr)
            tableRef?.current?.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [currentValues, eeData])

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
        <div ref={tableRef}>
            <DataTable dense className={styles.table}>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableColumnHeader dense>
                            {i18n.t('Org Unit')}
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
                        ({ ouId, ouName, value, current, isNoValue }) => {
                            return (
                                <DataTableRow key={ouId}>
                                    <DataTableCell dense>
                                        {ouName}
                                    </DataTableCell>
                                    <DataTableCell
                                        dense
                                        className={styles.current}
                                    >
                                        {current || ''}
                                    </DataTableCell>
                                    <DataTableCell dense>
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
                        <DataTableCell staticStyle colSpan={'3'}>
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

PopulationDataPreview.propTypes = {
    eeData: PropTypes.array,
}

export { PopulationDataPreview }
