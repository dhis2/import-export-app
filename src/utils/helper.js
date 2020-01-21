import i18n from '@dhis2/d2-i18n';

import { getUploadXHR } from './xhr';

const pathToId = path => {
    const pathSplit = path.split('/');
    const orgId = pathSplit[pathSplit.length - 1];
    return orgId;
};

const jsDateToISO8601 = date =>
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' +
    date
        .getDate()
        .toString()
        .padStart(2, 0);

const blobType = (format, compression) => {
    if (compression === 'gzip') {
        return `application/${format}+gzip`;
    } else if (compression === 'zip') {
        return `application/${format}+zip`;
    }

    if (format === 'xml') {
        return 'application/xml';
    } else if (format === 'json') {
        return 'application/json';
    }
};

const createBlob = (contents, format, compression = 'none') => {
    return URL.createObjectURL(
        new Blob([contents], { type: blobType(format, compression) })
    );
};

const downloadBlob = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

const fetchAndSetAttributes = (
    apiBaseUrl,
    setDataElementIdSchemeOptions,
    setOrgUnitIdSchemeOptions,
    setIdSchemeOptions
) => {
    const fetchOptions = {
        credentials: 'include',
    };

    const fetcher = (url, succF, errF) =>
        fetch(url, fetchOptions)
            .then(resp => resp.json())
            .then(json => {
                succF(json);
            })
            .catch(e => {
                errF(e);
            });

    const fields = 'id,displayName';
    const filters = attr => `unique:eq:true&filter=${attr}:eq:true`;
    const dataElAttributesURL = `${apiBaseUrl}attributes.json?paging=false&fields=${fields}&filter=${filters(
        'dataElementAttribute'
    )}`;
    const orgUnitAttributesURL = `${apiBaseUrl}attributes.json?paging=false&fields=${fields}&filter=${filters(
        'organisationUnitAttribute'
    )}`;

    fetcher(
        dataElAttributesURL,
        ({ attributes }) => {
            setDataElementIdSchemeOptions(old => {
                return [
                    ...old,
                    ...attributes.map(({ id, displayName }) => ({
                        value: `ATTRIBUTE:${id}`,
                        label: i18n.t(displayName),
                    })),
                ];
            });
        },
        e => {
            console.log('Data element attributes fetch error: ', e);
        }
    );

    fetcher(
        orgUnitAttributesURL,
        ({ attributes }) => {
            setOrgUnitIdSchemeOptions(old => {
                return [
                    ...old,
                    ...attributes.map(({ id, displayName }) => ({
                        value: `ATTRIBUTE:${id}`,
                        label: i18n.t(displayName),
                    })),
                ];
            });
        },
        e => {
            console.log('Organization unit attributes fetch error: ', e);
        }
    );
};

const uploadFile = (
    url,
    file,
    format,
    type,
    setLoading,
    setAlerts,
    addEntry
) => {
    setLoading(true);
    try {
        const xhr = getUploadXHR(
            url,
            file,
            type,
            ({ id, msg }) => {
                let entry;
                if (id == -1 && !msg) {
                    entry = {
                        id,
                        created: new Date(),
                        file: file.name,
                        completed: true,
                        summary: undefined,
                        error: true,
                        importType: type,
                    };
                } else {
                    entry = {
                        id,
                        created: new Date(),
                        lastUpdated: new Date(),
                        file: file.name,
                        completed: id == -1,
                        events: [msg],
                        summary: undefined,
                        error: id == -1,
                        importType: type,
                    };
                }
                addEntry(id, entry);
            },
            e => {
                let message = i18n.t('An unknown error occurred');
                try {
                    const response = JSON.parse(e.target.response);
                    message = response.message;
                } catch (e2) {}
                throw message;
            },
            format
        );
        xhr.send(file);
        setLoading(false);
    } catch (e) {
        console.error('sendFile error: ', e);
        setAlerts([
            {
                id: 'xhr-${timestamp}',
                critical: true,
                message: i18n.t(
                    'An unknown error occurred. Please try again later'
                ),
            },
        ]);
        setLoading(false);
    }
};

export {
    createBlob,
    downloadBlob,
    fetchAndSetAttributes,
    jsDateToISO8601,
    pathToId,
    uploadFile,
};
