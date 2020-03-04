import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { DataImport } from '../../pages/DataImport'
import { DataExport } from '../../pages/DataExport'
import { EventExport } from '../../pages/EventExport'
import { EventImport } from '../../pages/EventImport'
import { GMLImport } from '../../pages/GMLImport'
import { MetadataDependencyExport } from '../../pages/MetadataDependencyExport'
import { MetadataExport } from '../../pages/MetadataExport'
import { MetadataImport } from '../../pages/MetadataImport'
import { JobOverview } from '../../pages/JobOverview'

const Router = () => {
    const location = useLocation()

    return (
        <Switch>
            <Route path="/import/data">
                <DataImport query={location.query} />
            </Route>
            <Route path="/import/event">
                <EventImport query={location.query} />
            </Route>
            <Route path="/import/gml">
                <GMLImport query={location.query} />
            </Route>
            <Route path="/import/metadata">
                <MetadataImport query={location.query} />
            </Route>
            <Route path="/export/data">
                <DataExport />
            </Route>
            <Route path="/export/event">
                <EventExport />
            </Route>
            <Route path="/export/metadata-dependency">
                <MetadataDependencyExport />
            </Route>
            <Route path="/export/metadata">
                <MetadataExport />
            </Route>
            <Route path="/utils/job-overview">
                <JobOverview />
            </Route>
            <Redirect from="*" to="/import/data" />
        </Switch>
    )
}

export { Router }
