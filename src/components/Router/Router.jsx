import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
    DataImport,
    DataExport,
    EventExport,
    EventImport,
    EarthEngineImport,
    GeometryImport,
    GMLImport,
    MetadataDependencyExport,
    MetadataExport,
    MetadataImport,
    TEIExport,
    TEIImport,
    JobOverview,
    Home,
} from '../../pages/index.js'
import { ScrollToTop } from '../Router/ScrollToTop.jsx'

const Router = () => {
    return (
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/import/data" component={DataImport} />
                <Route path="/import/event" component={EventImport} />
                <Route
                    path="/import/earthengine"
                    component={EarthEngineImport}
                />
                <Route path="/import/geometry" component={GeometryImport} />
                <Route path="/import/gml" component={GMLImport} />
                <Route path="/import/metadata" component={MetadataImport} />
                <Route path="/import/tei" component={TEIImport} />
                <Route path="/export/data" component={DataExport} />
                <Route path="/export/event" component={EventExport} />
                <Route
                    path="/export/metadata-dependency"
                    component={MetadataDependencyExport}
                />
                <Route path="/export/metadata" component={MetadataExport} />
                <Route path="/export/tei" component={TEIExport} />
                <Route path="/utils/job-overview" component={JobOverview} />
                <Redirect from="*" to="/" />
            </Switch>
        </ScrollToTop>
    )
}

export { Router }
