import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Divider, Menu, MenuItem } from '@dhis2/ui-core'

import s from './Sidebar.module.css'
import { pagePropType } from '../../../utils/pages'
import { StyledLink } from '../StyledLink/'

const Sidebar = ({ importPages, exportPages, pathname }) => {
    return (
        <Menu className={s.menu}>
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
        </Menu>
    )
}

Sidebar.propTypes = {
    exportPages: PropTypes.arrayOf(pagePropType).isRequired,
    importPages: PropTypes.arrayOf(pagePropType).isRequired,
    pathname: PropTypes.string.isRequired,
}

export { Sidebar }
