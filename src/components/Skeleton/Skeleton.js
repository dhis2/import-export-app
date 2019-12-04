import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { CssReset, Divider, Menu, MenuItem } from '@dhis2/ui-core';

import { ImportPages, ExportPages, Pages } from '../../utils/pages';
import UnstyledLink from './UnstyledLink';

export const Skeleton = () => {
    return (
        <Router>
            <Menu>
                <h3>Import</h3>
                {ImportPages.map(p => (
                    <UnstyledLink to={p.path} key={p.path}>
                        <MenuItem label={p.name} />
                    </UnstyledLink>
                ))}
                <Divider />
                <h3>Export</h3>
                {ExportPages.map(p => (
                    <UnstyledLink to={p.path} key={p.path}>
                        <MenuItem label={p.name} />
                    </UnstyledLink>
                ))}
            </Menu>

            <Switch>
                {Pages.map(p => (
                    <Route path={p.path} key={p.path}>
                        {p.component}
                    </Route>
                ))}
            </Switch>
        </Router>
    );
};
