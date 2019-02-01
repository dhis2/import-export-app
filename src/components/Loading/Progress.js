import React, { Component } from 'react'
import { eventEmitter } from 'services'
import { LinearProgress } from '@dhis2/ui/core'
import s from './styles.css'

export class Progress extends Component {
    state = {
        progress: 0,
    }

    componentDidMount() {
        eventEmitter.on('upload.progress', this.onProgress)
    }

    componentWillUnMount() {
        eventEmitter.off('upload.progress', this.onProgress)
    }

    onProgress = stats =>
        this.setState({
            progress: stats.percentComplete,
        })

    render() {
        return <LinearProgress amount={50} margin={'100px'} />
    }
}

export default Progress
