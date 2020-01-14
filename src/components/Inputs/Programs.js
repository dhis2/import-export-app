import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-final-form'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { Select } from '../FinalFormComponents/Select'
import { fetchPrograms } from '../../reducers/program/thunks'
import {
    getPrograms,
    getProgramsError,
    getProgramsLoaded,
    getProgramsLoading,
} from '../../reducers/program/selectors'

export const PROGRAMS_KEY = 'programs'
export const PROGRAMS_DEFAULT_VALUE = ''

const programsLabel = i18n.t('Programs')

const useLoadPrograms = () => {
    const form = useForm()
    const dispatch = useDispatch()
    const loading = useSelector(getProgramsLoading)
    const loaded = useSelector(getProgramsLoaded)
    const error = useSelector(getProgramsError)

    useEffect(() => {
        if (!loaded && !loading && !error) {
            dispatch(fetchPrograms()).then(({ payload }) => {
                const { programs } = payload

                if (!programs.length) return

                const [firstProgram] = payload.programs
                form.change(PROGRAMS_KEY, firstProgram.value)
            })
        }
    }, [loaded, loading, error, dispatch, form])
}

export const Programs = () => {
    useLoadPrograms()

    const programs = useSelector(getPrograms)
    const loading = useSelector(getProgramsLoading)
    const loaded = useSelector(getProgramsLoaded)
    const error = useSelector(getProgramsError)

    if (!loaded || loading) {
        return <ProgramsLoading />
    } else if (error) {
        return <ProgramsError error={error} />
    }

    return (
        <Field>
            <Select
                name={PROGRAMS_KEY}
                label={programsLabel}
                options={programs}
                dataTest="input-programs"
            />
        </Field>
    )
}

export const ProgramsLoading = () => (
    <div data-test="input-programs-loading">
        <Field>
            <Label>{programsLabel}</Label>
            {i18n.t('Loading program options...')}
        </Field>
    </div>
)

export const ProgramsError = ({ error }) => (
    <div data-test="input-programs-error">
        <Field>
            <Label>{programsLabel}</Label>
            {i18n.t('Something went wrong when loading the programs!')}
            <br />
            {error}
        </Field>
    </div>
)
