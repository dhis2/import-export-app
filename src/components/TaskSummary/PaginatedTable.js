import React from 'react'
import s from './styles.css'

const TOTAL_PAGES_IN_NAV = 10

function getPaginationRange(current, total) {
    let first = current - TOTAL_PAGES_IN_NAV / 2
    if (first <= 0) {
        first = 1
    }

    let last = first + TOTAL_PAGES_IN_NAV - 1
    if (last > total) {
        last = total
        first = last - TOTAL_PAGES_IN_NAV

        if (first < 0) {
            first = 1
        }
    }

    return [first, last]
}

function getPages(current, first, last, limit, onClick) {
    const pages = []
    for (let i = first; i <= last; i += 1) {
        const className = i === current ? `${s.page} ${s.current}` : s.page
        pages.push(
            <div
                key={`pi-${i}`}
                className={className}
                onClick={() => onClick((i - 1) * limit)}
            >
                {i}
            </div>
        )
    }
    return <div className={s.pages}>{pages}</div>
}

function getPaginationStats(current, start, limit, total, onClick) {
    return (
        <div className={s.nav}>
            <div className={s.action} onClick={() => onClick(start - limit)}>
                &#60;
            </div>
            <div className={s.text}>
                Page {current} of {total}
            </div>
            <div className={s.action} onClick={() => onClick(start + limit)}>
                &#62;
            </div>
        </div>
    )
}

function Pagination({ total: _total, start, limit, onClick }) {
    const total = Math.ceil(_total / limit)
    const current = Math.ceil((start + limit) / limit)
    const [first, last] = getPaginationRange(current, total)

    if (last === 1) {
        return null
    }

    return (
        <div className={s.pagination}>
            {getPaginationStats(current, start, limit, total, onClick)}
            {getPages(current, first, last, limit, onClick)}
        </div>
    )
}

export default class PaginatedTable extends React.Component {
    state = {
        start: 0,
        limit: 10,
    }

    rows() {
        const { fields, list } = this.props
        const rows = list.slice(
            this.state.start,
            this.state.start + this.state.limit
        )

        if (rows.length === 0) {
            return null
        }

        const k = fields[0]['key']

        return rows.map((row, i) => (
            <tr key={`rtr-${row[k]}-${i}`}>
                {fields.map(({ key }, j) => (
                    <td key={`rtd-${row[key]}-${j}`}>{row[key]}</td>
                ))}
            </tr>
        ))
    }

    onClick = start => this.setState({ start })

    colgroup() {
        return (
            <colgroup>
                {this.props.fields.map(({ width }, i) => (
                    <col key={`col-${i}`} width={width} />
                ))}
            </colgroup>
        )
    }

    thead() {
        return (
            <thead>
                <tr>
                    {this.props.fields.map(({ title }) => (
                        <td key={`title-${title}`}>{title}</td>
                    ))}
                </tr>
            </thead>
        )
    }

    tfoot() {
        return (
            <tfoot>
                <tr>
                    <td colSpan={this.props.fields.length}>
                        <Pagination
                            start={this.state.start}
                            limit={this.state.limit}
                            total={this.props.list.length}
                            onClick={this.onClick}
                        />
                    </td>
                </tr>
            </tfoot>
        )
    }

    tbody() {
        return <tbody>{this.rows()}</tbody>
    }

    render() {
        if (this.props.list.length === 0) {
            return null
        }

        return (
            <table className={`${s.table} ${s.paginatedTable}`}>
                {this.colgroup()}
                {this.thead()}
                {this.tbody()}
                {this.tfoot()}
            </table>
        )
    }
}
