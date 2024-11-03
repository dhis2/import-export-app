import i18n from '@dhis2/d2-i18n'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { render, fireEvent, cleanup } from 'test-utils'

import { TaskContext } from '../../../contexts/index.js'
import { JobOverview } from '../../index.js'
import { MenuLabel } from '../MenuLabel/MenuLabel.jsx'
import { tasksState, allJobs } from './data.js'

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

const props = {
    activeTypes: [],
    setActiveTypes: jest.fn(),
    selectedJob: undefined,
    setSelectedJob: jest.fn(),
}

const renderContext = (contextValue, props) => {
    const history = createMemoryHistory()
    return render(
        <TaskContext.Provider value={{ tasks: contextValue }}>
            <Router history={history}>
                <JobOverview {...props} />
            </Router>
        </TaskContext.Provider>
    )
}

test('should show "no jobs started" message when no jobs', async () => {
    const contextValue = {
        data: {},
        event: {},
        gml: {},
        geojson: {},
        metadata: {},
        tei: {},
    }

    const { getByText } = renderContext(contextValue, props)
    expect(getByText(i18n.t('No jobs started yet.'))).toBeInTheDocument()
})

test('should show list of jobs started', async () => {
    const contextValue = { ...tasksState }
    const selectedJob = allJobs[0]

    const { getByDataTest, getAllByDataTest } = renderContext(contextValue, {
        ...props,
        activeTypes: [
            'DATAVALUE_IMPORT',
            'EVENT_IMPORT',
            'GEOJSON_IMPORT',
            'GML_IMPORT',
            'METADATA_IMPORT',
        ],
        selectedJob,
    })

    // jobOverviewContainer should contain list of jobs and a jobSummaryContainer
    const jobOverviewContainer = getByDataTest('job-overview-container')
    const jobOverviewTasks = getByDataTest('job-overview-tasks')
    const jobSummaryContainer = getByDataTest('job-overview-summary')

    expect(jobOverviewContainer).toContainElement(jobOverviewTasks)
    expect(jobOverviewContainer).toContainElement(jobSummaryContainer)

    // all events of selected job should be showing
    selectedJob.events.forEach((e) =>
        expect(jobSummaryContainer).toHaveTextContent(e.text)
    )

    // number of items in list should be total number of jobs started
    const listElements = getAllByDataTest(/job-overview-menu-label-*/)
    expect(listElements).toHaveLength(allJobs.length)
})

test('import type filters should filter jobs', async () => {
    const contextValue = { ...tasksState }
    const selectedJob = allJobs[0]
    const setSelectedJob = jest.fn()
    const setActiveTypes = jest.fn()

    const { getByDataTest, getAllByDataTest, getByText } = renderContext(
        contextValue,
        {
            ...props,
            activeTypes: [
                'DATAVALUE_IMPORT',
                'EVENT_IMPORT',
                'GEOJSON_IMPORT',
                'GML_IMPORT',
            ],
            selectedJob,
            setSelectedJob,
            setActiveTypes,
        }
    )

    // number of items in list should be total number of jobs started
    // minus the number of "METADATA_IMPORTA" type jobs
    const listElements = getAllByDataTest(/job-overview-menu-label-*/)
    expect(listElements).toHaveLength(
        allJobs.filter((j) => j.importType != 'METADATA_IMPORT').length
    )

    // click on another job should trigger setSelectedJob function
    const eventJobText = getByText('event1.json')
    fireEvent.click(eventJobText)
    expect(setSelectedJob).toHaveBeenCalledTimes(1)
    expect(setSelectedJob).toHaveBeenCalledWith(
        allJobs.find(
            (j) =>
                j.importType == 'EVENT_IMPORT' &&
                j.jobDetails.files[0].name == 'event1.json'
        )
    )

    // clicking on metadata chip should trigger the setActiveTypes function
    const metadataChip = getByDataTest('job-overview-chips-metadata')
    fireEvent.click(metadataChip)
    expect(setActiveTypes).toHaveBeenCalledTimes(1)
    expect(setActiveTypes).toHaveBeenCalledWith([
        'DATAVALUE_IMPORT',
        'EVENT_IMPORT',
        'GEOJSON_IMPORT',
        'GML_IMPORT',
        'METADATA_IMPORT',
    ])
})

describe('MenuLabel', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<MenuLabel task={allJobs[0]} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
