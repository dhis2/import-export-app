import {
    apiFetchOrganisationUnitLevels,
    ouIdHelper,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    OrganisationUnitTree,
    MultiSelect,
    MultiSelectOption,
    Button,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styles from './styles/OrgUnitDimension.module.css'

// This file has been copies and adapted from @dhis2/analytics OrgUnitDimension

const formatList = (items) => {
    try {
        const formatter = new Intl.ListFormat(i18n.language, {
            style: 'long',
            type: 'conjunction',
        })
        return formatter.format(items)
    } catch (error) {
        return items.join(', ')
    }
}

const OrgUnitDimension = ({ roots, selected, onSelect }) => {
    const [ouLevels, setOuLevels] = useState([])
    const dataEngine = useDataEngine()

    const onSelectItems = (selectedItem) => {
        const { id, checked, displayName, path } = selectedItem
        let result = [...selected]

        if (checked) {
            result.push({ id, path, name: displayName })
        } else {
            result = [...result.filter((item) => item.id !== id)]
        }

        onSelect({
            dimensionId: DIMENSION_ID_ORGUNIT,
            items: result,
        })
    }

    const clearSelection = () =>
        onSelect({
            dimensionId: DIMENSION_ID_ORGUNIT,
            items: [],
        })

    useEffect(() => {
        const doFetchOuLevels = async () => {
            const result = await apiFetchOrganisationUnitLevels(dataEngine)
            result.sort((a, b) => (a.level > b.level ? 1 : -1))
            setOuLevels(result)
        }

        doFetchOuLevels()
    }, [dataEngine])

    const onLevelChange = (ids) => {
        const items = ids.map((id) => ({
            id: ouIdHelper.addLevelPrefix(id),
            name: ouLevels.find((level) => level.id === id).displayName,
        }))

        onSelect({
            dimensionId: DIMENSION_ID_ORGUNIT,
            items: [
                ...selected.filter((ou) => !ouIdHelper.hasLevelPrefix(ou.id)),
                ...items,
            ],
        })
    }

    const getSummary = () => {
        let summary
        if (selected.length) {
            const numberOfOrgUnits = selected.filter(
                (item) => !ouIdHelper.hasLevelPrefix(item.id)
            ).length

            const numberOfLevels = selected.filter((item) =>
                ouIdHelper.hasLevelPrefix(item.id)
            ).length

            const parts = []

            if (numberOfOrgUnits) {
                parts.push(
                    i18n.t('{{count}} org units', {
                        count: numberOfOrgUnits,
                        defaultValue: '{{count}} org unit',
                        defaultValue_plural: '{{count}} org units',
                    })
                )
            }
            if (numberOfLevels) {
                parts.push(
                    i18n.t('{{count}} levels', {
                        count: numberOfLevels,
                        defaultValue: '{{count}} level',
                        defaultValue_plural: '{{count}} levels',
                    })
                )
            }

            summary = i18n.t(
                'Selected: {{commaSeparatedListOfOrganisationUnits}}',
                {
                    keySeparator: '>',
                    nsSeparator: '|',
                    commaSeparatedListOfOrganisationUnits: formatList(parts),
                }
            )
        } else {
            summary = i18n.t('Nothing selected')
        }

        return summary
    }

    return (
        <div className={styles.orgUnitDimension}>
            <div className={styles.left}>
                <OrganisationUnitTree
                    roots={roots}
                    initiallyExpanded={[
                        ...(roots.length === 1 ? [`/${roots[0]}`] : []),
                        ...selected
                            .filter(
                                (item) => !ouIdHelper.hasLevelPrefix(item.id)
                            )
                            .map((item) =>
                                item.path.substring(
                                    0,
                                    item.path.lastIndexOf('/')
                                )
                            )
                            .filter((path) => path),
                    ]}
                    selected={selected
                        .filter((item) => !ouIdHelper.hasLevelPrefix(item.id))
                        .map((item) => item.path)}
                    onChange={onSelectItems}
                />
            </div>
            <div className={styles.right}>
                <MultiSelect
                    selected={
                        ouLevels.length
                            ? selected
                                  .filter((item) =>
                                      ouIdHelper.hasLevelPrefix(item.id)
                                  )
                                  .map((item) =>
                                      ouIdHelper.removePrefix(item.id)
                                  )
                            : []
                    }
                    onChange={({ selected }) => onLevelChange(selected)}
                    placeholder={i18n.t('Select a level')}
                    loading={!ouLevels.length}
                    dense
                >
                    {ouLevels.map((level) => (
                        <MultiSelectOption
                            key={level.id}
                            value={level.id}
                            label={level.displayName}
                        />
                    ))}
                </MultiSelect>
                <div className={styles.summary}>
                    <span className={styles.summaryText}>{getSummary()}</span>
                    <div className={styles.deselectButton}>
                        <Button
                            secondary
                            small
                            onClick={clearSelection}
                            disabled={!selected.length}
                        >
                            {i18n.t('Deselect all')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
OrgUnitDimension.propTypes = {
    roots: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.string,
        })
    ),
    onSelect: PropTypes.func,
}

export { OrgUnitDimension }
