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
    AlertStack,
    AlertBar,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import styles from './styles/DataPreview.module.css'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const NO_ROWS = []

const PopulationDataPreview = ({
    eeData,
    pointOuRows,
    rowsPerPage,
    onRowsPerPageChanged,
}) => {
    const [tableData, setTableData] = useState([])
    const [page, setPage] = useState(1)
    const { currentValues, error } = useFetchCurrentValues()
    const tableRef = useRef(null)

    useEffect(() => {
        if (eeData) {
            const newArr = eeData
                .map((d) => {
                    const current = currentValues.find(
                        (v) => v.orgUnit === d.ouId
                    )

                    return { current: current?.value, ...d }
                })
                .concat(
                    pointOuRows.map(({ id, parentName, name }) => ({
                        ouId: id,
                        ouParentName: parentName,
                        ouName: name,
                        value: i18n.t('Point org. unit - no value'),
                        isNoValue: true,
                    }))
                )

            setTableData(newArr)
        }
    }, [currentValues, eeData, pointOuRows])

    useEffect(() => {
        tableRef?.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [tableData, tableRef])

    const visibleRows = useMemo(() => {
        if (!tableData.length) {
            return NO_ROWS
        }
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return tableData.slice(start, end)
    }, [tableData, rowsPerPage, page])

    if (!tableData.length) {
        return null
    }

    const getNumPages = () => Math.ceil(tableData.length / rowsPerPage)
    const isLastPage = () => page === getNumPages()
    const getLastPageLength = () => tableData.length % rowsPerPage

    const updateTablePaging = (rows) => {
        setPage(1)
        onRowsPerPageChanged(rows)
    }

    return (
        <div ref={tableRef}>
            <DataTable dense className={styles.table}>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableColumnHeader dense>
                            {i18n.t('Organisation Unit')}
                        </DataTableColumnHeader>
                        <DataTableColumnHeader dense>
                            {i18n.t('Current value')}
                        </DataTableColumnHeader>
                        <DataTableColumnHeader dense>
                            {i18n.t('New value')}
                        </DataTableColumnHeader>
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    {visibleRows.map(
                        ({
                            ouId,
                            ouParentName,
                            ouName,
                            value,
                            current,
                            isNoValue,
                        }) => {
                            return (
                                <DataTableRow key={ouId}>
                                    <DataTableCell dense>
                                        <>
                                            {ouParentName && (
                                                <span
                                                    className={
                                                        styles.parentOuName
                                                    }
                                                >
                                                    {`${ouParentName} / `}
                                                </span>
                                            )}
                                            <span>{ouName}</span>
                                        </>
                                    </DataTableCell>
                                    <DataTableCell dense>
                                        <span className={styles.current}>
                                            {current || ''}
                                        </span>
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
                                    page={page}
                                    isLastPage={isLastPage()}
                                    onPageChange={setPage}
                                    onPageSizeChange={updateTablePaging}
                                    pageSize={rowsPerPage}
                                    pageSizeSelectText={i18n.t('Rows per page')}
                                    total={tableData.length}
                                    pageLength={
                                        isLastPage()
                                            ? getLastPageLength()
                                            : null
                                    }
                                    pageCount={getNumPages()}
                                    pageSummaryText={({
                                        firstItem,
                                        lastItem,
                                        page,
                                        pageCount,
                                        total,
                                    }) =>
                                        i18n.t(
                                            'Page {{page}} of {{pageCount}}, row {{firstItem}}-{{lastItem}} of {{total}}',
                                            {
                                                firstItem,
                                                lastItem,
                                                page,
                                                pageCount,
                                                total,
                                            }
                                        )
                                    }
                                />
                            </div>
                        </DataTableCell>
                    </DataTableRow>
                </DataTableFoot>
            </DataTable>
            <AlertStack>
                {error && (
                    <AlertBar warning={true} duration={2000}>
                        {error}
                    </AlertBar>
                )}
            </AlertStack>
        </div>
    )
}

PopulationDataPreview.propTypes = {
    eeData: PropTypes.array,
    pointOuRows: PropTypes.array,
    rowsPerPage: PropTypes.number,
    onRowsPerPageChanged: PropTypes.func,
}

export { PopulationDataPreview }
