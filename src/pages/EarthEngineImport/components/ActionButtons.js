import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, ButtonStrip, Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'

const { useField } = ReactFinalForm

const ActionButtons = ({ dataTest, form }) => {
    const { bandMap } = useCatOptComboSelections()
    return (
        <div data-test={dataTest}>
            <ButtonStrip dataTest={`${dataTest}-button-strip`}>
                <Button
                    primary
                    type="submit"
                    onClick={() => form.change('dryRun', true)}
                >
                    {i18n.t('Start dry run')}
                </Button>
                <Button
                    secondary
                    type="submit"
                    onClick={() => form.change('dryRun', false)}
                >
                    {i18n.t('Start import')}
                </Button>
            </ButtonStrip>
        </div>
    )
}

ActionButtons.propTypes = {
    dataTest: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
}

export { ActionButtons }
