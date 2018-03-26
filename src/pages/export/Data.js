import React from 'react'
import i18n from 'd2-i18n'

export class DataExport extends React.Component {
  static path = '/export/data'

  static title = i18n.t('Data Export')
  static description = i18n.t(
    'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.',
  )

  render() {
    return <div>export data</div>
  }
}
