import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.jsx'
import { ASSOCIATED_GEOMETRY } from '../util/formFieldConstants.js'

export const NO_ASSOCIATED_GEOMETRY = 'Noassociatedgeometry'

const AssociatedGeometry = () => {
    const { associatedGeometry } = useCachedDataQuery()

    return (
        <div style={{ maxWidth: '300px', width: '300px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name={ASSOCIATED_GEOMETRY}
                label={i18n.t('Use associated geometry')}
                options={associatedGeometry}
                dataTest="input-data-elements"
                defaultValue={NO_ASSOCIATED_GEOMETRY}
                helpText={i18n.t(
                    'Select associated geometry for selected organisation units'
                )}
                filled
            />
        </div>
    )
}

export { AssociatedGeometry }
