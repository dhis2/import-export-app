import React from 'react'
import i18n from 'd2-i18n'

export class EventImport extends React.Component {
  static path = '/import/event'

  static order = 4
  static title = i18n.t('Event Import')
  static description = i18n.t(
    'Import events for programs, stages and tracked entities in the DXF 2 format.'
  )

  render() {
    return <div>import event</div>
  }
}
