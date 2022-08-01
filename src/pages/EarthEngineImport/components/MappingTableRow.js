import i18n from '@dhis2/d2-i18n'
import {
    TableRow,
    TableCell,
    SingleSelectFieldFF,
    // SingleSelectField,
    // SingleSelectOption,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { StyledField } from '../../../components/index.js'

const MappingTableRow = ({
    bandId,
    bandName,
    // selected,
    // setSelected,
    catOptComboList,
    // cocIdsSelected,
}) => {
    // const usedCocIds = cocIdsSelected.filter(cocId => cocId !== selected)
    return (
        <TableRow>
            <TableCell dense>{bandId}</TableCell>
            <TableCell dense>{bandName}</TableCell>
            <TableCell dense>
                <StyledField
                    component={SingleSelectFieldFF}
                    name={bandId}
                    inputWidth="150px"
                    filterable
                    noMatchText={i18n.t('No match found')}
                    options={catOptComboList}
                />
            </TableCell>
        </TableRow>
    )
}

MappingTableRow.propTypes = {
    bandId: PropTypes.string.isRequired,
    bandName: PropTypes.string.isRequired,
    catOptComboList: PropTypes.array.isRequired,
    // cocIdsSelected: PropTypes.array.isRequired,
    // setSelected: PropTypes.func.isRequired,
    // selected: PropTypes.string,
}

export { MappingTableRow }
