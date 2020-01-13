import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';

import { MinusIcon, PlusIcon } from '../Icon';
import s from './MoreOptions.module.css';

const MoreOptions = ({ children, show, setShow }) => {
    return (
        <div className={s.container}>
            <div className={s.header} onClick={() => setShow(!show)}>
                {show ? <MinusIcon /> : <PlusIcon />}
                {i18n.t('more options')}
            </div>
            <div className={s.children}>{show && children}</div>
        </div>
    );
};

export { MoreOptions };
