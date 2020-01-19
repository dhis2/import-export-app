import React, { useContext } from 'react';
import i18n from '@dhis2/d2-i18n';

import { SchemeContext } from '../../contexts/';
import { Select } from '../Select';

const IdScheme = ({ selected, setSelected }) => {
    const { Id } = useContext(SchemeContext);
    return (
        <Select
            name="IdScheme"
            label={i18n.t('ID scheme')}
            options={Id}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { IdScheme };
