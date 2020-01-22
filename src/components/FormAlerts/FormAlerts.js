import React, { useEffect, useState } from 'react';
import { AlertBar } from '@dhis2/ui-core';

import s from './FormAlerts.module.css';

const FormAlerts = ({ alerts }) => {
    const [bars, setBars] = useState([]);

    useEffect(() => {
        const newBars = alerts.map(a => (
            <AlertBar
                key={`alert-${a.id}`}
                warning={a.warning}
                info={a.info}
                critical={a.critical}
                success={a.success}
                duration={8000}
            >
                {a.message}
            </AlertBar>
        ));
        setBars(newBars);
    }, [alerts]);

    if (bars.length == 0) return null;

    return <div className={s.container}>{bars}</div>;
};

export { FormAlerts };
