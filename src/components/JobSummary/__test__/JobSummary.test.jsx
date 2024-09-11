import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { allJobs } from '../../JobOverview/__test__/data.js'
import { JobSummary } from '../JobSummary.jsx'

const props = {
    showFileDetails: true,
    showJobDetails: true,
    dataTest: 'job-summary',
}

const renderJobSummary = (task, props) => {
    const jobSummary = render(<JobSummary task={task} {...props} />)
    return { ...jobSummary }
}

describe('summary for a GML job', () => {
    const gmlJob = allJobs.find((j) => j.importType == 'GML_IMPORT')

    test('type count is showing', () => {
        const { getByDataTest } = renderJobSummary(gmlJob, props)
        const typeCount = getByDataTest('job-summary-type-count')
        expect(typeCount).toBeInTheDocument()
        expect(typeCount).toBeVisible()
    })

    test('messages are showing', () => {
        const { getByDataTest } = renderJobSummary(gmlJob, props)
        const messages = getByDataTest('job-summary-messages')
        expect(messages).toBeInTheDocument()
        expect(messages).toBeVisible()
    })

    test('completed, error and dry run tags are showing', () => {
        const { getByDataTest } = renderJobSummary(gmlJob, props)
        const tags = getByDataTest('job-summary-tags')
        expect(tags).toHaveTextContent(i18n.t('Completed'))
        expect(tags).toHaveTextContent(i18n.t('Error'))
        expect(tags).toHaveTextContent(i18n.t('Dry run'))
    })

    test('events are showing', () => {
        const { getByDataTest } = renderJobSummary(gmlJob, props)
        const events = getByDataTest('job-summary-log')
        expect(events).toBeInTheDocument()
        expect(events).toBeVisible()
    })

    test('job details are showing', () => {
        const { getByDataTest } = renderJobSummary(gmlJob, props)
        const jobDetails = getByDataTest('job-summary-job-details')
        expect(jobDetails).toBeInTheDocument()
        expect(jobDetails).toBeVisible()
    })

    it('matches snapshot', () => {
        const { asFragment } = renderJobSummary(gmlJob, props)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe('summary for a data import job with conflicts', () => {
    const dataJob = allJobs.find(
        (j) => j.importType == 'DATAVALUE_IMPORT' && j.summary.conflicts
    )

    test('overview summary is showing', () => {
        const { getByDataTest } = renderJobSummary(dataJob, props)
        const overviewSummary = getByDataTest('job-summary-single-summary')
        expect(overviewSummary).toHaveTextContent(i18n.t('Summary'))
    })

    test('conflicts are showing', () => {
        const { getByDataTest } = renderJobSummary(dataJob, props)
        const conflicts = getByDataTest('job-summary-conflicts')
        expect(conflicts).toBeInTheDocument()
        expect(conflicts).toBeVisible()
    })

    test('completed, conflicts and dry run tags are showing', () => {
        const { getByDataTest } = renderJobSummary(dataJob, props)
        const tags = getByDataTest('job-summary-tags')
        expect(tags).toHaveTextContent(i18n.t('Completed'))
        expect(tags).toHaveTextContent(i18n.t('Conflicts'))
        expect(tags).toHaveTextContent(i18n.t('Dry run'))
    })

    test('events are showing', () => {
        const { getByDataTest } = renderJobSummary(dataJob, props)
        const events = getByDataTest('job-summary-log')
        expect(events).toBeInTheDocument()
        expect(events).toBeVisible()
    })

    test('job details are showing', () => {
        const { getByDataTest } = renderJobSummary(dataJob, props)
        const jobDetails = getByDataTest('job-summary-job-details')
        expect(jobDetails).toBeInTheDocument()
        expect(jobDetails).toBeVisible()
    })

    it('matches snapshot', () => {
        const { asFragment } = renderJobSummary(dataJob, props)
        expect(asFragment()).toMatchSnapshot()
    })
})
