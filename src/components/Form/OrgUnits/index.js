import React from 'react'
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree'

function OrgUnits(props) {
  return <OrgUnitTree {...props} onSelectClick={props.onChange} />
}

export default OrgUnits
