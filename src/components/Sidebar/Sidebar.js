import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Divider, Menu, MenuItem } from '@dhis2/ui-core'

import s from './Sidebar.module.css'
import { pagePropType } from '../../utils/pages'
import { StyledLink } from '../StyledLink/'

const Sidebar = ({ importPages, exportPages, jobOverviewPage }) => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Menu className={s.Menu}>
            <h3 className={s.sectionTitle}>{i18n.t('Import')}</h3>

            {importPages.map(({ icon, name, code, path }) => (
                <StyledLink
                    to={path}
                    key={path}
                    dataTest={`sidebar-link-${code}`}
                >
                    <MenuItem
                        active={pathname == path}
                        icon={icon}
                        label={name}
                    />
                </StyledLink>
            ))}
            <Divider />
            <h3 className={s.sectionTitle}>{i18n.t('Export')}</h3>
            {exportPages.map(({ icon, name, code, path }) => (
                <StyledLink
                    to={path}
                    key={path}
                    dataTest={`sidebar-link-${code}`}
                >
                    <MenuItem
                        active={pathname == path}
                        icon={icon}
                        label={name}
                    />
                </StyledLink>
            ))}
            <Divider />
            <StyledLink
                to={jobOverviewPage.path}
                key={jobOverviewPage.path}
                dataTest={`sidebar-link-${jobOverviewPage.code}`}
            >
                <MenuItem
                    active={pathname == jobOverviewPage.path}
                    icon={jobOverviewPage.icon}
                    label={jobOverviewPage.name}
                    className={
                        pathname == jobOverviewPage.path ? '' : s.jobOverview
                    }
                />
            </StyledLink>
        </Menu>
    )
}

Sidebar.propTypes = {
    exportPages: PropTypes.arrayOf(pagePropType).isRequired,
    importPages: PropTypes.arrayOf(pagePropType).isRequired,
    jobOverviewPage: pagePropType.isRequired,
}

export { Sidebar }
