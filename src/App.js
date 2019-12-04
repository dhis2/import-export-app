import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { DataQuery } from '@dhis2/app-runtime';
import { CssReset } from '@dhis2/ui-core';
import i18n from '@dhis2/d2-i18n';

import { Skeleton } from './components/Skeleton';

const MyApp = () => (
    <div>
        <CssReset />
        <Router>
            <Skeleton />
        </Router>
    </div>
);

export default MyApp;
