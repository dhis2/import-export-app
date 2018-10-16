import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PaginatedTable from './PaginatedTable'
import s from './styles.css'

export function Totals({ created, deleted, ignored, updated, total }) {
    return (
        <table className={`${s.table} ${s.totals}`}>
            <thead>
                <tr>
                    <td>{i18n.t('Created')}</td>
                    <td>{i18n.t('Deleted')}</td>
                    <td>{i18n.t('Ignored')}</td>
                    <td>{i18n.t('Updated')}</td>
                    <td>{i18n.t('Total')}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{created}</td>
                    <td>{deleted}</td>
                    <td>{ignored}</td>
                    <td>{updated}</td>
                    <td>{total}</td>
                </tr>
            </tbody>
        </table>
    )
}

export function TypeStats({ list }) {
    return (
        <table className={`${s.table} ${s.typeCount}`}>
            <thead>
                <tr>
                    <td>{i18n.t('Type')}</td>
                    <td>{i18n.t('Created')}</td>
                    <td>{i18n.t('Deleted')}</td>
                    <td>{i18n.t('Ignored')}</td>
                    <td>{i18n.t('Updated')}</td>
                    <td>{i18n.t('Total')}</td>
                </tr>
            </thead>
            <tbody>
                {list.map(
                    (
                        { type, created, deleted, ignored, updated, total },
                        i
                    ) => (
                        <tr key={`ts-${i}`}>
                            <td>{type}</td>
                            <td>{created}</td>
                            <td>{deleted}</td>
                            <td>{ignored}</td>
                            <td>{updated}</td>
                            <td>{total}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

const titles = ['uid', 'Type', 'Property', 'Message']
const fields = [
    {
        key: 'uid',
        title: 'UID',
        width: '10%',
    },
    {
        key: 'type',
        title: 'Type',
        width: '15%',
    },
    {
        key: 'property',
        title: 'Property',
        width: '15%',
    },
    {
        key: 'message',
        title: 'Message',
        width: '60%',
    },
]
export function Messages({ list }) {
    return <PaginatedTable fields={fields} titles={titles} list={list} />
}
