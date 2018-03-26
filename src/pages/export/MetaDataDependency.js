import React from 'react'
import i18n from 'd2-i18n'

export class MetaDataDependencyExport extends React.Component {
  static path = '/export/metadata-dependency'

  static order = 6
  static title = i18n.t('Metadata Dependency Export')
  static description = i18n.t(
    'Export metadata like data sets and programs including related metadata objects.',
  )

  render() {
    return <div>export MetaData dependency</div>
  }
}
