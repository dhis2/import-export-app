import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Divider, Menu, MenuItem } from '@dhis2/ui-core'

import styles from './Sidebar.module.css'
import { StyledLink } from '../index'
import {
    DataIcon,
    EventIcon,
    GMLIcon,
    MetadataDependencyExportIcon,
    MetadataExportIcon,
    MetadataImportIcon,
    TEIIcon,
    TasksIcon,
} from '../index'

const dataImportPage = {
    name: i18n.t('Data import'),
    code: 'data-import',
    icon: <DataIcon />,
    path: '/import/data',
}

const eventImportPage = {
    name: i18n.t('Event import'),
    code: 'event-import',
    icon: <EventIcon />,
    path: '/import/event',
}

const gmlImportPage = {
    name: i18n.t('GML import'),
    code: 'gml-import',
    icon: <GMLIcon />,
    path: '/import/gml',
}

const metadataImportPage = {
    name: i18n.t('Metadata import'),
    code: 'metadata-import',
    path: '/import/metadata',
    icon: <MetadataImportIcon />,
}
const teiImportPage = {
    name: i18n.t('TEI import'),
    code: 'tei-import',
    path: '/import/tei',
    icon: <TEIIcon />,
}

const dataExportPage = {
    name: i18n.t('Data export'),
    code: 'data-export',
    path: '/export/data',
    icon: <DataIcon />,
}

const eventExportPage = {
    name: i18n.t('Event export'),
    code: 'event-export',
    path: '/export/event',
    icon: <EventIcon />,
}

const metadataDependencyExportPage = {
    name: i18n.t('Metadata dependency export'),
    code: 'metadata-dependency-export',
    path: '/export/metadata-dependency',
    icon: <MetadataDependencyExportIcon />,
}

const metadataExportPage = {
    name: i18n.t('Metadata export'),
    code: 'metadata-export',
    path: '/export/metadata',
    icon: <MetadataExportIcon />,
}

const teiExportPage = {
    name: i18n.t('TEI export'),
    code: 'tei-export',
    path: '/export/tei',
    icon: <TEIIcon />,
}

const importPages = [
    dataImportPage,
    eventImportPage,
    gmlImportPage,
    metadataImportPage,
    teiImportPage,
]

const exportPages = [
    dataExportPage,
    eventExportPage,
    metadataDependencyExportPage,
    metadataExportPage,
    teiExportPage,
]

const jobOverviewPage = {
    name: i18n.t('Job overview'),
    code: 'job-overview',
    path: '/utils/job-overview',
    icon: <TasksIcon />,
}

const SidebarItem = ({ name, path, code, icon, active, className }) => (
    <StyledLink to={path} dataTest={`sidebar-link-${code}`}>
        <MenuItem
            active={active}
            icon={icon}
            label={name}
            className={className}
        />
    </StyledLink>
)

SidebarItem.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
}

const Sidebar = () => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Menu className={styles.Menu}>
            <h3 className={styles.sectionTitle}>{i18n.t('Import')}</h3>
            {importPages.map(({ icon, name, code, path }) => {
                const active = pathname == path
                return (
                    <SidebarItem
                        name={name}
                        path={path}
                        code={code}
                        icon={icon}
                        active={active}
                        key={path}
                    />
                )
            })}
            <Divider />
            <h3 className={styles.sectionTitle}>{i18n.t('Export')}</h3>
            {exportPages.map(({ icon, name, code, path }) => {
                const active = pathname == path
                return (
                    <SidebarItem
                        name={name}
                        path={path}
                        code={code}
                        icon={icon}
                        active={active}
                        key={path}
                    />
                )
            })}
            <Divider />
            <SidebarItem
                name={jobOverviewPage.name}
                path={jobOverviewPage.path}
                code={jobOverviewPage.code}
                icon={jobOverviewPage.icon}
                active={pathname == jobOverviewPage.path}
                className={
                    pathname == jobOverviewPage.path ? '' : styles.jobOverview
                }
                key={jobOverviewPage.path}
            />
        </Menu>
    )
}

export { Sidebar }
