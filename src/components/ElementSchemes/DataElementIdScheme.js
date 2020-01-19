import React, { useContext } from 'react';
import i18n from '@dhis2/d2-i18n';

import { SchemeContext } from '../../contexts/';
import { Select } from '../Select';

const DataElementIdScheme = ({ selected, setSelected }) => {
    const { DataElementId } = useContext(SchemeContext);
    return (
        <Select
            name="dataElementIdScheme"
            label={i18n.t('Data element ID scheme')}
            options={DataElementId}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { DataElementIdScheme };
