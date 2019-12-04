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

function menu(list) {
    return list.map(i => ({
        to: i.path,
        text: i.title,
        icon: i.menuIcon,
        dataTest: i.dataTest,
    }))
}

export const importLinks = menu([
    MetaDataImport,
    DataImport,
    EventImport,
    GMLImport,
])

export const exportLinks = menu([
    MetaDataExport,
    DataExport,
    EventExport,
    MetaDataDependencyExport,
])
