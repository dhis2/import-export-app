import { InputField } from '@dhis2/ui-core'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { CheckboxGroup } from '../FinalFormComponents/CheckboxGroup'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import {
    getDataSetsError,
    getDataSetsFilter,
    getDataSetsLoaded,
    getDataSetsLoading,
    getFilteredDataSets,
} from '../../reducers/dataSets/selectors'
import { loadDataSets } from '../../reducers/dataSets/thunks'
import { setDataSetsFilter } from '../../reducers/dataSets/actions'
import styles from './DataSets.module.css'

export const DATA_SETS_KEY = 'selectedDataSets'
export const DATA_SETS_DEFAULT_VALUE = []
export const dataSetsLabel = i18n.t('Data sets')

const useLoadDataSets = () => {
    const dispatch = useDispatch()
    const loading = useSelector(getDataSetsLoading)
    const loaded = useSelector(getDataSetsLoaded)
    const error = useSelector(getDataSetsError)

    useEffect(() => {
        if (!loaded && !loading && !error) dispatch(loadDataSets())
    }, [loaded, loading, error, dispatch])
}

export const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(getDataSetsFilter)
    const onChange = event => dispatch(setDataSetsFilter(event.target.value))

    return (
        <InputField
            className={styles.filter}
            dense
            label={i18n.t('Data sets filter')}
            placeholder={i18n.t('filter data sets by name')}
            name="dataSetsFilter"
            value={filter}
            onChange={onChange}
        />
    )
}

export const DataSets = () => {
    const dataSets = useSelector(getFilteredDataSets)
    const loading = useSelector(getDataSetsLoading)
    const loaded = useSelector(getDataSetsLoaded)
    const error = useSelector(getDataSetsError)

    useLoadDataSets()

    if (!loaded || loading) return <DataSetsLoading />
    if (error) return <DataSetsError error={error} />

    return (
        <Field>
            <Label>{dataSetsLabel}</Label>
            <Filter />
            <div data-test="input-data-sets">
                <CheckboxGroup name={DATA_SETS_KEY} options={dataSets} />
            </div>
        </Field>
    )
}

export const DataSetsLoading = () => (
    <div data-test="input-data-sets-loading">
        <Field>
            <Label>{dataSetsLabel}</Label>
            {i18n.t('Loading organisation unit id scheme options...')}
        </Field>
    </div>
)

export const DataSetsError = ({ error }) => (
    <div data-test="input-data-sets-error">
        <Field>
            <Label>{dataSetsLabel}</Label>
            {i18n.t('Something went wrong when loading the data sets!')}
            <br />
            {error}
        </Field>
    </div>
)
