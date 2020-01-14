import { useForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { PROGRAMS_KEY } from './Programs'
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

const useFetchProgramStages = () => {
    const { subscribe, change } = useForm()
    const [program, setProgram] = useState()
    const dispatch = useDispatch()

    useEffect(
        () =>
            subscribe(
                ({ values }) => {
                    const newProgram = values[PROGRAMS_KEY]
                    if (program !== newProgram) setProgram(newProgram)
                },
                { values: true }
            ),
        [program] // eslint-disable-line react-hooks/exhaustive-deps
    )

    useEffect(() => {
        if (program) {
            dispatch(fetchProgramStages(program))
            change(PROGRAM_STAGES_KEY, '')
        }
    }, [program]) // eslint-disable-line react-hooks/exhaustive-deps
}

export const ProgramStages = () => {
    useFetchProgramStages()

    const programStages = useSelector(getProgramStages)
    const loading = useSelector(getProgramStagesLoading)
    const error = useSelector(getProgramStagesError)

    if (error) return <ProgramStagesError error={error} />
    if (loading) return <ProgramStagesLoading />

    return (
        <Field>
            <Select
                name={PROGRAM_STAGES_KEY}
                label={programStagesLabel}
                options={[...PROGRAM_STAGES_DEFAULT_OPTIONS, ...programStages]}
                dataTest="input-program-stages"
            />
        </Field>
    )
}

export const ProgramStagesLoading = () => (
    <div data-test="input-program-stages-loading">
        <Field>
            <Label>{programStagesLabel}</Label>
            {i18n.t('Loading programStage options...')}
        </Field>
    </div>
)

export const ProgramStagesError = ({ error }) => (
    <div data-test="input-program-stages-error">
        <Field>
            <Label>{programStagesLabel}</Label>
            {i18n.t('Something went wrong when loading the programStages!')}
            <br />
            {error}
        </Field>
    </div>
)
