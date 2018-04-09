import React from 'react'
import cx from 'classnames'
import i18n from 'd2-i18n'
import s from './styles.css'

import { CTX_DEFAULT, CTX_MORE_OPTIONS } from 'components/Form'

export default function MoreOptions({ enabled, onClick }) {
  return (
    <div
      className={cx(s.container, enabled && s.enabled)}
      onClick={() => onClick(enabled ? CTX_DEFAULT : CTX_MORE_OPTIONS)}
    >
      {i18n.t('more options')}
    </div>
  )
}
