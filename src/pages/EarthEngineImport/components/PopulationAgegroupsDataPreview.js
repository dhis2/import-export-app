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
    AlertStack,
    AlertBar,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import styles from './styles/DataPreview.module.css'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const NO_ROWS = []

const { useFormState } = ReactFinalForm

const PopulationAgegroupsDataPreview = ({
    eeData,
    pointOuRows,
    rowsPerPage,
    pageNo,
    onRowsPerPageChanged,
    onPageChanged,
}) => {
    const { values } = useFormState()
    const { dataElementId, bandCocs } = values
    const { dataElements } = useCachedDataQuery()

    const [tableData, setTableData] = useState([])
    const { currentValues, error } = useFetchCurrentValues()
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
    }, [currentValues, eeData, pointOuRows, bandCocMap, cocMap])

    useEffect(() => {
        tableRef?.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [tableData, tableRef])

    const visibleRows = useMemo(() => {
        if (!tableData.length) {
            return NO_ROWS
        }
        const start = (pageNo - 1) * rowsPerPage
        const end = start + rowsPerPage

        return tableData.slice(start, end)
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
                            {i18n.t('Organisation Unit')}
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
                                ouParentName,
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
                                    page={pageNo}
                                    isLastPage={isLastPage()}
                                    onPageChange={onPageChanged}
                                    onPageSizeChange={onRowsPerPageChanged}
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

PopulationAgegroupsDataPreview.propTypes = {
    eeData: PropTypes.array,
    pageNo: PropTypes.number,
    pointOuRows: PropTypes.array,
    rowsPerPage: PropTypes.number,
    onPageChanged: PropTypes.func,
    onRowsPerPageChanged: PropTypes.func,
}

export { PopulationAgegroupsDataPreview }
