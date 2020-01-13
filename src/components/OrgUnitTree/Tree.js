import React from 'react';
import { Radio, Checkbox, Node } from '@dhis2/ui-core';

import s from './Tree.module.css';

const Tree = ({ list, select, selected, multiSelect, onOpen, onClose }) => {
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

export { Tree };
