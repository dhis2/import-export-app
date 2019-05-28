import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import i18n from '@dhis2/d2-i18n'
import { SidePanel, Logger } from '../../components'
import s from './styles.module.css'

export default class Template extends React.Component {
    static contextTypes = {
        d2: PropTypes.object,
    }

    render() {
        return (
            <React.Fragment>
                <HeaderBar appName={i18n.t('Import/Export')} />
                <div className={s.container}>
                    <SidePanel />
                    <div id="import-export-app-content" className={s.content}>
                        {this.props.children}
                    </div>
                    <Logger />
                </div>
            </React.Fragment>
        )
    }
}
