import React from 'react';
import { DataQuery } from '@dhis2/app-runtime';
import { CssReset } from '@dhis2/ui-core';
import i18n from '@dhis2/d2-i18n';

import { Skeleton } from './components/Skeleton';

const MyApp = () => (
    <div>
        <CssReset />
        <Skeleton />
    </div>
);

export default MyApp;
