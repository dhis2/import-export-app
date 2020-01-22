import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, Node } from '@dhis2/ui-core';

import s from './Tree.module.css';

const Tree = ({
    list,
    select,
    selected,
    multiSelect,
    onOpen,
    onClose,
    dataTest,
}) => {
    const view = () => node(list);

    const node = (l, d = 0) => {
        if (!Array.isArray(list)) {
            return null;
        }

        return l.map(({ open, label, value, children, hasChildren }) => {
            const component = multiSelect ? (
                <Checkbox
                    name={value}
                    value={value}
                    label={label}
                    checked={selected.includes(value)}
                    onChange={() => select(value)}
                />
            ) : (
                <Radio
                    name={value}
                    value={value}
                    label={label}
                    checked={selected.includes(value)}
                    onChange={() => select(value)}
                />
            );

            return (
                <Node
                    key={`node-${value}`}
                    open={open}
                    label={label}
                    component={component}
                    value={value}
                    onOpen={() => onOpen(value, children)}
                    onClose={() => onClose(value, children)}
                    dataTest={dataTest}
                >
                    {hasChildren && children.length == 0 ? (
                        <span>placeholder</span>
                    ) : null}
                    {children ? node(children, d + 1) : null}
                </Node>
            );
        });
    };

    return list.length == 0 ? null : (
        <div className={s.container}>{view()}</div>
    );
};

const listItemPropType = PropTypes.exact({
    children: PropTypes.array.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
});

//   80:5  error  Callback prop types must be listed after all other prop types  react/sort-prop-types
Tree.propTypes = {
    list: PropTypes.arrayOf(listItemPropType).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    // eslint-disable-next-line react/sort-prop-types
    onOpen: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    dataTest: PropTypes.string,
    multiSelect: PropTypes.bool,
};

export { Tree };
