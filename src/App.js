import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useConfig } from '@dhis2/app-runtime';
import { CssReset } from '@dhis2/ui-core';
import i18n from '@dhis2/d2-i18n';

import { fetchAndSetAttributes } from './utils/helper';
import {
    dataElementIdSchemeOptions,
    orgUnitIdSchemeOptions,
    idSchemeOptions,
} from './utils/options';
import { Skeleton } from './components/Skeleton';
import { SchemeContext } from './contexts/';

const MyApp = () => {
    const { baseUrl } = useConfig();
    const [
        dataElementIdSchemeOptionsDyn,
        setDataElementIdSchemeOptions,
    ] = useState(dataElementIdSchemeOptions);
    const [orgUnitIdSchemeOptionsDyn, setOrgUnitIdSchemeOptions] = useState(
        orgUnitIdSchemeOptions
    );
    const [idSchemeOptionsDyn, setIdSchemeOptions] = useState(idSchemeOptions);
    const [schemeContext, setSchemeContext] = useState({
        DataElementId: dataElementIdSchemeOptionsDyn,
        OrgUnitId: orgUnitIdSchemeOptionsDyn,
        Id: idSchemeOptionsDyn,
    });

    useEffect(() => {
        fetchAndSetAttributes(
            `${baseUrl}/api/`,
            setDataElementIdSchemeOptions,
            setOrgUnitIdSchemeOptions,
            setIdSchemeOptions
        );
    }, []);

    useEffect(() => {
        setSchemeContext({
            DataElementId: dataElementIdSchemeOptionsDyn,
            OrgUnitId: orgUnitIdSchemeOptionsDyn,
            Id: idSchemeOptionsDyn,
        });
    }, [
        dataElementIdSchemeOptionsDyn,
        orgUnitIdSchemeOptionsDyn,
        idSchemeOptionsDyn,
    ]);

    return (
        <div>
            <CssReset />
            <SchemeContext.Provider value={schemeContext}>
                <Router>
                    <Skeleton />
                </Router>
            </SchemeContext.Provider>
        </div>
    );
};

export default MyApp;
