import React from 'react'
import i18n from 'd2-i18n'

export class DataImport extends React.Component {
  static path = '/import/data'

  static order = 2
  static title = i18n.t('Data Import')
  static description = i18n.t(
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formats. DXF 2 is the standard exchange format for DHIS 2.',
  )

  render() {
    return <div>import data</div>
  }
}
