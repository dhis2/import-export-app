import React from 'react';

import s from './FormField.module.css';

const FormField = ({ label, required = false, children }) => {
    return (
        <div className={s.container}>
            <span className={s.label}>
                {label}
                {required && <span> *</span>}
            </span>
            {children}
        </div>
    );
};

export { FormField };
