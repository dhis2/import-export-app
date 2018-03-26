import React from 'react'
import i18n from 'd2-i18n'

export class MetaDataImport extends React.Component {
  static path = '/import/metadata'

  static order = 1
  static title = i18n.t('Metadata Import')
  static description = i18n.t(
    'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.',
  )

  render() {
    return <div>import metadata</div>
  }
}
