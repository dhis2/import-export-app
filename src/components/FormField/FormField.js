import React from 'react';

import s from './FormField.module.css';

const FormField = ({ label, children }) => {
    return (
        <div className={s.container}>
            <span className={s.label}>{label}</span>
            {children}
        </div>
    );
};

export { FormField };
