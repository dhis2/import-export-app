import { ReactFinalForm } from '@dhis2/ui'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'

const { useField } = ReactFinalForm

const isSelected = (val) => val.length > 0

const useCatOptComboSelections = () => {
    const { input: earthEngineIdInput } = useField('earthEngineId')
    const { value: eeId } = earthEngineIdInput
    const { input: m0Input } = useField('M_0')
    const { value: cocM0 } = m0Input
    const { input: m1Input } = useField('M_1')
    const { value: cocM1 } = m1Input
    const { input: m5Input } = useField('M_5')
    const { value: cocM5 } = m5Input
    const { input: f0Input } = useField('F_0')
    const { value: cocF0 } = f0Input
    const { input: f1Input } = useField('F_1')
    const { value: cocF1 } = f1Input
    const { input: f5Input } = useField('F_5')
    const { value: cocF5 } = f5Input

    const allBandsSelected =
        isSelected(cocM0) &&
        isSelected(cocM1) &&
        isSelected(cocM5) &&
        isSelected(cocF0) &&
        isSelected(cocF1) &&
        isSelected(cocF5)

    const bandMap =
        eeId === POPULATION_DATASET_ID
            ? null
            : {
                  M_0: cocM0,
                  M_1: cocM1,
                  M_5: cocM5,
                  F_0: cocF0,
                  F_1: cocF1,
                  F_5: cocF5,
              }

    return {
        bandMap,
        allBandsSelected,
    }
}

export { useCatOptComboSelections }
