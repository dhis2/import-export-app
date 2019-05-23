import {
    MetaDataImport,
    MetaDataExport,
    DataImport,
    DataExport,
    GMLImport,
    EventImport,
    EventExport,
    MetaDataDependencyExport,
} from '../../pages'

const pages = [
    MetaDataImport,
    DataImport,
    EventImport,
    GMLImport,
    MetaDataExport,
    DataExport,
    EventExport,
    MetaDataDependencyExport,
]

const list = pages.map(p => ({
    path: p.path,
    order: p.order,
    menuIcon: p.menuIcon,
    title: p.title,
    description: p.desc,
}))

export default list
