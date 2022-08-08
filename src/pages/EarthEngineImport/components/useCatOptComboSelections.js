import { ReactFinalForm } from '@dhis2/ui'
import { getEarthEngineConfigs } from '../util/earthEngines.js'
import { getCocMap } from '../util/getCocMap.js'

const { useFormState } = ReactFinalForm

const useCatOptComboSelections = () => {
    const { values } = useFormState()
    const eeId = values.earthEngineId
    const config = getEarthEngineConfigs(eeId)

    if (!config?.bands) {
        return { bandMap: null }
    }

    const bandCocMap = getCocMap(eeId, values)

    return {
        bandMap: bandCocMap,
    }
}

export { useCatOptComboSelections }
