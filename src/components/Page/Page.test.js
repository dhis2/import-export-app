import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { LogoIcon, Page } from '../index.js'
import { allJobs } from '../JobOverview/__test__/data.js'

const dataJob = allJobs.find((j) => j.importType == 'DATAVALUE_IMPORT')

const renderPage = (props) =>
    render(
        <Page {...props}>
            <p>Child paragraph</p>
        </Page>
    )

const props = {
    dataTest: 'page',
    title: 'Title',
    desc: 'Description',
    icon: <LogoIcon />,
}

describe('matches snapshot', () => {
    it('when not loading and no summary task', () => {
        const { asFragment } = renderPage(props)
        expect(asFragment()).toMatchSnapshot()
    })

    it('when loading(bool) and no summary task', () => {
        const { asFragment } = renderPage({ ...props, loading: true })
        expect(asFragment()).toMatchSnapshot()
    })

    it('when loading(number) and no summary task', () => {
        const { asFragment } = renderPage({ ...props, loading: 50 })
        expect(asFragment()).toMatchSnapshot()
    })

    it('when not loading and a full summary task', () => {
        const summaryTask = dataJob
        const { asFragment } = renderPage({
            ...props,
            summaryTask,
            showFullSummaryTask: true,
        })
        expect(asFragment()).toMatchSnapshot()
    })

    it('when not loading and a mini summary task', () => {
        const summaryTask = dataJob
        const { asFragment } = renderPage({ ...props, summaryTask })
        expect(asFragment()).toMatchSnapshot()
    })
})
