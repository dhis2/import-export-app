import i18n from '@dhis2/d2-i18n'
import { Divider, Menu, MenuItem } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {
    DataIcon,
    EventIcon,
    GeometryIcon,
    MetadataDependencyExportIcon,
    MetadataExportIcon,
    MetadataImportIcon,
    TEIIcon,
    TasksIcon,
} from '../index.js'
import { ExportMenuSectionHeader } from './ExportMenuSectionHeader.jsx'
import { ImportMenuSectionHeader } from './ImportMenuSectionHeader.jsx'
import styles from './Sidebar.module.css'

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

const eeImportPage = {
    name: i18n.t('Earth Engine import'),
    code: 'earthengine-import',
    icon: <DataIcon />,
    path: '/import/earthengine',
}

const geometryImportPage = {
    name: i18n.t('Org unit geometry import'),
    code: 'geometry-import',
    icon: <GeometryIcon />,
    path: '/import/geometry',
}

const metadataImportPage = {
    name: i18n.t('Metadata import'),
    code: 'metadata-import',
    path: '/import/metadata',
    icon: <MetadataImportIcon />,
}
const teiImportPage = {
    name: i18n.t('Tracked entity import'),
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
    name: i18n.t('Tracked entity export'),
    code: 'tei-export',
    path: '/export/tei',
    icon: <TEIIcon />,
}

const importPages = [
    dataImportPage,
    eventImportPage,
    eeImportPage,
    geometryImportPage,
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

const SidebarItem = ({ name, path, code, active, className }) => {
    const history = useHistory()
    const navigateToPath = () => history.push(path)
    const href = history.createHref({
        pathname: path,
        search: '',
        hash: '',
    })

    return (
        <MenuItem
            active={active}
            href={href}
            onClick={navigateToPath}
            label={name}
            className={cx(className, {
                [styles.sidebarItem]: !active,
                [styles.sidebarItemActive]: active,
            })}
            dataTest={`sidebar-link-${code}`}
        />
    )
}

SidebarItem.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
}

const Sidebar = () => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <Menu className={styles.Menu}>
            <SidebarItem
                name={i18n.t('Overview')}
                path={'/'}
                code={'home'}
                active={pathname == '/'}
            />
            <ImportMenuSectionHeader />
            {importPages.map(({ icon, name, code, path }) => {
                const active =
                    pathname == path ||
                    (pathname === '/import/gml' && path === '/import/geometry')

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
            <ExportMenuSectionHeader />
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
