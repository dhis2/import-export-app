import React from 'react'
import i18n from 'd2-i18n'

export class EventExport extends React.Component {
  static path = '/export/event'

  static title = i18n.t('Event Export')
  static description = i18n.t(
    'Export event data for programs, stages and tracked entities in the DXF 2 format.',
  )

  render() {
    return <div>export event</div>
  }
}
