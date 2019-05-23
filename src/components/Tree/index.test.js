import React from 'react'
import { Tree } from './'

const wrapper = mount(<Tree list={[]} />)

describe('Tree', () => {
    it('empty render', () => {
        expect(wrapper.html()).toEqual(null)
    })

    it('render single node', () => {
        const list = [
            {
                open: false,
                value: '/1',
                label: '1',
                children: [],
            },
        ]
        const selected = []
        wrapper.setProps({ list, selected })
        expect(
            wrapper.containsAllMatchingElements([
                <div style={{ minWidth: 7 }} />,
                <div>+</div>,
                <div>1</div>,
            ])
        ).toEqual(true)
    })

    it('render multiple root nodes', () => {
        const list = [
            {
                open: false,
                value: '/1',
                label: '1',
                children: [],
            },
            {
                open: false,
                value: '/2',
                label: '2',
                children: [],
            },
        ]
        const selected = []
        wrapper.setProps({ list, selected })
        expect(
            wrapper.containsAllMatchingElements([
                <div style={{ minWidth: 7 }} />,
                <div>+</div>,
                <div>1</div>,

                <div style={{ minWidth: 7 }} />,
                <div>+</div>,
                <div>2</div>,
            ])
        ).toEqual(true)
    })

    it('check open node', () => {
        const list = [
            {
                open: true,
                value: '/1',
                label: '1',
                children: [],
            },
        ]
        const selected = []
        wrapper.setProps({ list, selected })
        expect(wrapper.containsAllMatchingElements([<div>−</div>])).toEqual(
            true
        )
    })
})
