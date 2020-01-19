import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useConfig, useDataQuery } from '@dhis2/app-runtime';
import { CssReset, CircularLoader } from '@dhis2/ui-core';
import i18n from '@dhis2/d2-i18n';

import { fetchAndSetAttributes } from './utils/helper';
import {
    dataElementIdSchemeOptions,
    orgUnitIdSchemeOptions,
    idSchemeOptions,
} from './utils/options';
import { Skeleton } from './components/Skeleton';
import { SchemeContext } from './contexts/';
import { UserContext } from './contexts/';

const userQuery = {
    user: {
        resource: 'me',
    },
};

const MyApp = () => {
    const { loading, error, data } = useDataQuery(userQuery);
    const { baseUrl } = useConfig();
    const [
        dataElementIdSchemeOptionsDyn,
        setDataElementIdSchemeOptions,
    ] = useState(dataElementIdSchemeOptions);
    const [orgUnitIdSchemeOptionsDyn, setOrgUnitIdSchemeOptions] = useState(
        orgUnitIdSchemeOptions
    );
    const [idSchemeOptionsDyn, setIdSchemeOptions] = useState(idSchemeOptions);
    const [elementSchemes, setElementSchemes] = useState({
        DataElementId: dataElementIdSchemeOptionsDyn,
        OrgUnitId: orgUnitIdSchemeOptionsDyn,
        Id: idSchemeOptionsDyn,
    });
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (data) {
            setUser(user);
        }
    }, [data]);

    useEffect(() => {
        fetchAndSetAttributes(
            `${baseUrl}/api/`,
            setDataElementIdSchemeOptions,
            setOrgUnitIdSchemeOptions,
            setIdSchemeOptions
        );
    }, []);

    useEffect(() => {
        setElementSchemes({
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
            {loading ? (
                <CircularLoader large />
            ) : (
                <UserContext.Provider value={user}>
                    <SchemeContext.Provider value={elementSchemes}>
                        <Router>
                            <Skeleton />
                        </Router>
                    </SchemeContext.Provider>
                </UserContext.Provider>
            )}
        </div>
    );
};

export default MyApp;
