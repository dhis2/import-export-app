import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import { optionPropType } from '../../utils/options';
import { SchemeContext } from '../../contexts/';
import { Select } from '../Select';

const DataElementIdScheme = ({ selected, setSelected, dataTest }) => {
    const { DataElementId } = useContext(SchemeContext);
    return (
        <Select
            name="dataElementIdScheme"
            label={i18n.t('Data element ID scheme')}
            options={DataElementId}
            selected={selected}
            setValue={setSelected}
            dense
            dataTest={dataTest}
        />
    );
};

DataElementIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
};

export { DataElementIdScheme };
