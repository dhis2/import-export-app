import React from 'react'
import i18n from 'd2-i18n'

export class MetaDataExport extends React.Component {
  static path = '/export/metadata'

  static order = 5
  static title = i18n.t('Metadata Export')
  static description = i18n.t(
    'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
  )

  render() {
    return <div>export metadata</div>
  }
}
