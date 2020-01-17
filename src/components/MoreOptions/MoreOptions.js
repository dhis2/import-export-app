import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';

import { MinusIcon, PlusIcon } from '../Icon';
import s from './MoreOptions.module.css';

const MoreOptions = ({ children, initiallyVisible = false }) => {
    const [hidden, setHidden] = useState(!initiallyVisible);

    const onToggle = e => {
        setHidden(!hidden);
    };

    return (
        <div className={s.container}>
            <div className={s.header} onClick={onToggle}>
                {hidden ? <PlusIcon /> : <MinusIcon />}
                {i18n.t('more options')}
            </div>
            <div className={s.children}>{!hidden && children}</div>
        </div>
    );
};

export { MoreOptions };
