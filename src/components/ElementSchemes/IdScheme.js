import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import { optionPropType } from '../../utils/options';
import { SchemeContext } from '../../contexts/';
import { Select } from '../Select';

const IdScheme = ({ selected, setSelected, dataTest }) => {
    const { Id } = useContext(SchemeContext);
    return (
        <Select
            name="IdScheme"
            label={i18n.t('ID scheme')}
            options={Id}
            selected={selected}
            setValue={setSelected}
            dense
            dataTest={dataTest}
        />
    );
};

IdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
};

export { IdScheme };
