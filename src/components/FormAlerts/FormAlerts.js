import React, { useEffect, useState } from 'react';
import { AlertBar } from '@dhis2/ui-core';

import s from './FormAlerts.module.css';

const FormAlerts = ({ alerts }) => {
    if (alerts.length == 0) return null;

    const bars = alerts.map(a => (
        <AlertBar
            key={`alert-${a.id}`}
            duration={a.duration ? a.duration : 8000}
            warning={a.warning}
            info={a.info}
            critical={a.critical}
        >
            {a.message}
        </AlertBar>
    ));

    return <div className={s.container}>{bars}</div>;
};

export { FormAlerts };
