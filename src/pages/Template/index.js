import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { SidePanel, Logger } from 'components'
import s from './styles.css'

import i18n from '@dhis2/d2-i18n'

export default class Template extends React.Component {
    static contextTypes = {
        d2: PropTypes.object,
    }

    render() {
        return (
            <div className={s.container}>
                <HeaderBar appName={i18n.t('Import/Export')} />
                <SidePanel />
                <div id="import-export-app-content" className={s.content}>
                    {this.props.children}
                </div>
                <Logger />
            </div>
        )
    }
}
