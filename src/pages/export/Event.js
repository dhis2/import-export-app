import { getInstance } from 'd2/lib/d2'
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import moment from 'moment/moment'

import { EventIcon } from 'components/Icon'
import { FormBase } from 'components/FormBase'
import { api } from 'services'
import {
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
} from 'helpers'

import { download } from '../../helpers/url'

export class EventExport extends FormBase {
    static dataTest = 'export-event'
    static path = '/export/event'

    static order = 8
    static title = i18n.t('Event Export')
    static desc = i18n.t(
        'Export event data for programs, stages and tracked entities in the DXF 2 format.'
    )

    static menuIcon = <EventIcon />
    icon = <EventIcon />

    formWidth = 800
    formTitle = i18n.t('Event Export')
    submitLabel = i18n.t('Export')

    fields = [
        ...getFormFields([
            'orgUnit_SingleSelect',
            'programs',
            'programStages',
            'idScheme',
            'startDate',
            'endDate',
            'format',
            'compression',
        ]),

        getFormFieldMoreOptions(),

        ...getFormFields(['includeDeleted', 'inclusion']),
    ]

    state = getFormValues([
        'orgUnit',
        'programs',
        'programStages',
        'idScheme',
        'startDate',
        'endDate',
        'format:.json:json,xml,csv',
        'compression',
        'includeDeleted',
        'inclusion',
    ])

    async componentDidMount() {
        await this.fetchPrograms()
        await this.fetchOrgUnits()
    }

    async fetchPrograms() {
        try {
            const objectType = 'programs'
            const params = 'fields=id,displayName&paging=false'
            const { data } = await api.get(`${objectType}?${params}`)
            const values = data[objectType].map(o => ({
                value: o.id,
                label: o.displayName,
            }))

            const selected = values[0]['value']
            this.setState(
                {
                    programs: { values, selected },
                },
                () => this.fetchProgramStages(selected)
            )
        } catch (e) {
            console.log('fetch Programs failed')
            console.log(e)
        }
    }

    async fetchOrgUnits() {
        try {
            const d2 = await getInstance()
            const orgUnitTree = await d2.models.organisationUnits
                .list({
                    level: 1,
                    paging: false,
                    fields: 'id,path,displayName,children::isNotEmpty',
                })
                .then(root => root.toArray()[0])

            this.setState({
                orgUnit: {
                    selected: [],
                    value: orgUnitTree,
                },
            })
        } catch (e) {
            console.log('fetch Programs failed')
            console.log(e)
        }
    }

    async fetchProgramStages(id) {
        try {
            const {
                data: { programStages },
            } = await api.get(
                `programs/${id}.json?fields=id,displayName,programStages[id,displayName]`
            )
            const values = programStages.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))

            values.unshift({
                value: -1,
                label: i18n.t('[ All program stages]'),
            })
            const selected = values[0]['value']
            this.setState({
                programStages: { values, selected },
            })
        } catch (e) {
            console.log('fetch ProgramStages failed', id)
            console.log(e)
        }
    }

    onFormUpdate = (name, value) => {
        if (name === 'programs') {
            this.fetchProgramStages(value)
        }
    }

    onSubmit = () => {
        const {
            orgUnit,
            startDate,
            endDate,
            programStages,
            inclusion,
            format,
            compression,
        } = this.getFormState()

        let attachment = `events${format}`
        if (compression !== 'none') {
            attachment += compression
        }

        const append = []

        if (programStages !== -1) {
            append.push(`programStage=${programStages}`)
        }

        if (orgUnit.length > 0) {
            const path = orgUnit[0]
            const orgUnitId = path.substr(path.lastIndexOf('/') + 1)
            append.push(`orgUnit=${orgUnitId}`)
        }

        append.push('links=false')
        append.push('skipPaging=true')
        append.push(`attachment=${attachment}`)
        append.push('startDate=' + moment(startDate).format('YYYY-MM-DD'))
        append.push('endDate=' + moment(endDate).format('YYYY-MM-DD'))
        append.push(`ouMode=${inclusion.toUpperCase()}`)
        append.push(`format=${format.substr(1)}`)

        let path = `events${format}`
        if (compression !== 'none') {
            path += `${compression}`
        }

        const params = getParamsFromFormState(
            this.getFormState(),
            ['programs', 'includeDeleted', 'idScheme'],
            append
        )

        download(api.url(path) + '?' + params)
    }
}
