import React from 'react'
import i18n from 'd2-i18n'

export class GMLImport extends React.Component {
  static path = '/import/gml'

  static order = 3
  static title = i18n.t('GML Import')
  static description = i18n.t(
    'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.',
  )

  render() {
    return <div>import gml</div>
  }
}
