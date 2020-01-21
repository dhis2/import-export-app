import React from 'react';
import i18n from '@dhis2/d2-i18n';

import { Select } from '../Select';
import { eventIdSchemeOptions } from '../../utils/options';

const EventIdScheme = ({ selected, setSelected }) => {
    return (
        <Select
            name="EventIdScheme"
            label={i18n.t('Event ID scheme')}
            options={eventIdSchemeOptions}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { EventIdScheme };
