import React from 'react'
import { SelectField as Select, MenuItem } from 'material-ui'
import { FormControl, FormLabel } from '../material-ui'
import s from './styles.module.css'

const styles = {
    style: {},
    labelStyle: {
        fontSize: 14,
        fontWeight: 500,
    },
    menuItemStyle: {
        fontSize: 14,
        fontWeight: 500,
    },
    underlineStyle: {
        borderBottom: 0,
    },
    selectedMenuItemStyle: {
        top: 0,
    },
}

export default class SelectField extends React.Component {
    onChange = (evt, index, value) =>
        this.props.onChange(this.props.name, value)

    render() {
        const { name, label, values, selected } = this.props
        const dataTest = this.props['data-test'] || undefined

        return (
            <div data-test={dataTest}>
                <FormControl className={s.formControl}>
                    <FormLabel className={s.formLabel}>{label}</FormLabel>
                    <Select
                        {...styles}
                        autoWidth={true}
                        value={selected}
                        onChange={this.onChange}
                        className={s.select}
                        fullWidth={false}
                    >
                        {values.map(v => (
                            <MenuItem
                                key={`mi-${name}-${v.value}`}
                                value={v.value}
                                primaryText={v.label}
                                className={s.menuItem}
                            />
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}
