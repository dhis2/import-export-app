import { FormSpy, useForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { Select } from '../FinalFormComponents/Select'
import { fetchProgramStages } from '../../reducers/programStage/thunks'
import {
    getProgramStages,
    getProgramStagesError,
    getProgramStagesLoading,
} from '../../reducers/programStage/selectors'

export const OPTION_SELECT_STAGE = {
    value: '',
    label: i18n.t('[ All program stages]'),
}
export const PROGRAM_STAGES_DEFAULT_OPTIONS = [OPTION_SELECT_STAGE]
export const PROGRAM_STAGES_KEY = 'programStages'
export const PROGRAM_STAGES_DEFAULT_VALUE = OPTION_SELECT_STAGE.value

const programStagesLabel = i18n.t('Program stages')

const RenderComponent = ({ values }) => {
    const form = useForm()
    const dispatch = useDispatch()
    const programs = values ? values.programs : null

    useEffect(() => {
        if (programs) {
            dispatch(fetchProgramStages(programs))
            form.change(PROGRAM_STAGES_KEY, '')
        }
    }, [programs]) // eslint-disable-line react-hooks/exhaustive-deps

    return null
}

export const ProgramStages = () => {
    let component
    const programStages = useSelector(getProgramStages)
    const loading = useSelector(getProgramStagesLoading)
    const error = useSelector(getProgramStagesError)

    if (loading) {
        component = <ProgramStagesLoading />
    } else if (error) {
        component = <ProgramStagesError error={error} />
    } else {
        const options = [...PROGRAM_STAGES_DEFAULT_OPTIONS, ...programStages]
        component = (
            <Field>
                <Select
                    name={PROGRAM_STAGES_KEY}
                    label={programStagesLabel}
                    options={options}
                    dataTest="input-programStages"
                />
            </Field>
        )
    }

    return (
        <div data-test="input-program-stages">
            <FormSpy
                subscription={{ values: { program: true } }}
                render={({ values }) => <RenderComponent values={values} />}
            />

            {component}
        </div>
    )
}

export const ProgramStagesLoading = () => (
    <Field>
        <Label>{programStagesLabel}</Label>
        {i18n.t('Loading programStage options...')}
    </Field>
)

export const ProgramStagesError = ({ error }) => (
    <Field>
        <Label>{programStagesLabel}</Label>
        {i18n.t('Something went wrong when loading the programStages!')}
        <br />
        {error}
    </Field>
)
