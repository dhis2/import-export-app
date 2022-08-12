import { ReactFinalForm } from '@dhis2/ui'
import { useMemo } from 'react'
import { getEarthEngineConfigs } from '../util/earthEngines.js'

const { useFormState } = ReactFinalForm

const getCocMap = (eeId, values) => {
    const config = getEarthEngineConfigs(eeId)
    if (config?.bands) {
        const bandIds = config.bands.map((b) => b.id)

        return bandIds.reduce(
            (acc, curr) => ({
                [curr]: values[curr],
                ...acc,
            }),
            {}
        )
    }

    return null
}

const useCatOptComboSelections = () => {
    const { values } = useFormState()
    const eeId = values.earthEngineId

    const bandCocMap = useMemo(() => getCocMap(eeId, values), [eeId, values])

    return bandCocMap
}

export { useCatOptComboSelections }
