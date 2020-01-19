import React, { useContext } from 'react';
import i18n from '@dhis2/d2-i18n';

import { SchemeContext } from '../../contexts/';
import { Select } from '../Select';

const OrgUnitIdScheme = ({ selected, setSelected }) => {
    const { OrgUnitId } = useContext(SchemeContext);
    return (
        <Select
            name="OrgUnitIdScheme"
            label={i18n.t('Organisation unit ID scheme')}
            options={OrgUnitId}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { OrgUnitIdScheme };
