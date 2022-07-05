import { ReactFinalForm } from '@dhis2/ui'
import { getEarthEngineConfigs } from '../util/earthEngines.js'
import { getCocMap } from '../util/getCocMap.js'

const { useFormState } = ReactFinalForm

const useCatOptComboSelections = () => {
    const { values } = useFormState()
    const eeId = values.earthEngineId
    const config = getEarthEngineConfigs(eeId)

    if (!config?.bands) {
        return { bandMap: null, allBandsSelected: null }
    }

    const bandCocMap = getCocMap(eeId, values)
    const cocBandValues = Object.keys(values).filter((k) =>
        Object.keys(bandCocMap).includes(k)
    )

    return {
        bandMap: bandCocMap,
        allBandsSelected: cocBandValues.length === config.bands.length,
    }
}

export { useCatOptComboSelections }
