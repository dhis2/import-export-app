import React from 'react'
import s from './styles.css'

const TOTAL_PAGES_IN_NAV = 10

function Pagination({ total, start, limit, onClick }) {
    const totalPages = Math.ceil(total / limit)
    const currentPage = Math.ceil((start + limit) / limit)

    // numerical pagination
    let first = currentPage - TOTAL_PAGES_IN_NAV / 2
    if (first <= 0) {
        first = 1
    }

    let last = first + TOTAL_PAGES_IN_NAV - 1
    if (last > totalPages) {
        last = totalPages
        first = last - TOTAL_PAGES_IN_NAV

        if (first < 0) {
            first = 1
        }
    }

    if (last === 1) {
        return null
    }

    const pages = []
    for (let i = first; i <= last; i += 1) {
        const className = i === currentPage ? `${s.page} ${s.current}` : s.page
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

    return (
        <div className={s.pagination}>
            <div className={s.nav}>
                <div
                    className={s.action}
                    onClick={() => onClick(start - limit)}
                >
                    &#60;
                </div>
                <div className={s.text}>
                    Page {currentPage} of {totalPages}
                </div>
                <div
                    className={s.action}
                    onClick={() => onClick(start + limit)}
                >
                    &#62;
                </div>
            </div>
            <div className={s.pages}>{pages}</div>
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

    render() {
        if (this.props.list.length === 0) {
            return null
        }

        const { fields } = this.props

        return (
            <table className={`${s.table} ${s.paginatedTable}`}>
                <colgroup>
                    {fields.map(({ width }, i) => (
                        <col key={`col-${i}`} width={width} />
                    ))}
                </colgroup>

                <thead>
                    <tr>
                        {fields.map(({ title }) => (
                            <td key={`title-${title}`}>{title}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>{this.rows()}</tbody>

                <tfoot>
                    <tr>
                        <td colSpan={fields.length}>
                            <Pagination
                                start={this.state.start}
                                limit={this.state.limit}
                                total={this.props.list.length}
                                onClick={this.onClick}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}
