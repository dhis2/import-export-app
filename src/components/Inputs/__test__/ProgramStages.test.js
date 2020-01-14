jest.unmock('react-final-form')

import { PROGRAMS_KEY } from '../Programs'

import { Form } from 'react-final-form'
import { mount } from 'enzyme'
import React from 'react'

import { ProgramStages } from '../ProgramStages'
import { fetchProgramStages } from '../../../reducers/programStage/thunks'
import {
    getProgramStages,
    getProgramStagesError,
    getProgramStagesLoading,
} from '../../../reducers/programStage/selectors'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => () => null),
}))

jest.mock('../../../reducers/programStage/thunks', () => ({
    fetchProgramStages: jest.fn(() =>
        Promise.resolve({
            type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
            payload: { programStagess: [] },
        })
    ),
}))

jest.mock('../../../reducers/programStage/selectors', () => ({
    getProgramStages: jest.fn(() => []),
    getProgramStagesError: jest.fn(() => ''),
    getProgramStagesLoading: jest.fn(() => false),
}))

describe('Input component - ProgramStages', () => {
    beforeEach(() => {
        getProgramStagesLoading.mockClear()
        fetchProgramStages.mockClear()
    })

    it('should show the loading state when loading the programStagess', () => {
        getProgramStagesLoading.mockImplementation(() => true)

        const component = mount(
            <Form
                onSubmit={() => null}
                initialValues={{ [PROGRAMS_KEY]: 'foo' }}
            >
                {() => <ProgramStages />}
            </Form>
        )
        const loading = component.find(
            '[data-test="input-program-stages-loading"]'
        )

        expect(loading).toHaveLength(1)
        getProgramStagesLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        getProgramStages.mockImplementation(() => [
            { value: 'foo', label: 'Foo' },
        ])

        const component = mount(
            <Form
                onSubmit={() => null}
                initialValues={{ [PROGRAMS_KEY]: 'foo' }}
            >
                {() => <ProgramStages />}
            </Form>
        )
        const input = component.find('[data-test="input-program-stages"]')

        expect(input).toHaveLength(1)
        getProgramStages.mockImplementation(() => [])
    })

    it('should load the programStages initially when programs is present', () => {
        const component = mount(
            <Form
                onSubmit={() => null}
                initialValues={{ [PROGRAMS_KEY]: 'foo' }}
            >
                {() => <ProgramStages />}
            </Form>
        )

        expect(fetchProgramStages).toHaveBeenCalledTimes(1)
    })
})
