import React from 'react'
import { Tree } from 'components'
// import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree'

function OrgUnits(props) {
  return <Tree multiple={false} selectable={true} />
  // console.log('OrgUnits')
  // console.log(props)
  // return <OrgUnitTree {...props} onSelectClick={props.onChange} />
}

export default OrgUnits
