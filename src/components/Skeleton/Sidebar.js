import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Divider, Menu, MenuItem } from '@dhis2/ui-core';

import s from './Sidebar.module.css';
import StyledLink from './StyledLink';

const Sidebar = ({ importPages, exportPages, pathname }) => {
    return (
        <Menu className={s.menu}>
            <h3 className={s.sectionTitle}>{i18n.t('Import')}</h3>

            {importPages.map(({ icon, name, path }) => (
                <StyledLink to={path} key={path}>
                    <MenuItem
                        active={pathname == path}
                        icon={icon}
                        label={name}
                    />
                </StyledLink>
            ))}
            <Divider />
            <h3 className={s.sectionTitle}>{i18n.t('Export')}</h3>
            {exportPages.map(({ icon, name, path }) => (
                <StyledLink to={path} key={path}>
                    <MenuItem
                        active={pathname == path}
                        icon={icon}
                        label={name}
                    />
                </StyledLink>
            ))}
        </Menu>
    );
};

export { Sidebar };
