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
            console.error('Data element attributes fetch error: ', e);
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
            console.error('Organization unit attributes fetch error: ', e);
        }
    );
};

const uploadFile = (
    url,
    file,
    format,
    type,
    setProgress,
    setAlerts,
    addEntry
) => {
    setProgress(1);
    const genericErrorMessage = i18n.t(
        'An unknown error occurred. Please try again later'
    );

    const errorHandler = message => {
        const timestamp = new Date().getTime();
        setAlerts(alerts => [
            ...alerts,
            {
                id: `xhr-${timestamp}`,
                critical: true,
                message: message ? message : genericErrorMessage,
            },
        ]);
        setProgress(0);
    };

    try {
        const xhr = getUploadXHR(
            url,
            file,
            type,
            ({ id, msg }) => {
                const newId = id == -1 ? new Date().getTime() : id;
                let entry;
                if (id == -1 && !msg) {
                    entry = {
                        id: newId,
                        created: new Date(),
                        file: file.name,
                        completed: true,
                        summary: undefined,
                        error: true,
                        importType: type,
                    };
                } else {
                    entry = {
                        id: newId,
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
                addEntry(newId, entry);

                if (id == -1) {
                    errorHandler(msg.text);
                }
                setProgress(0);
            },
            ev => {
                let message = genericErrorMessage;
                try {
                    const response = JSON.parse(ev.target.response);
                    message = response.message;
                } catch (e2) {}
                errorHandler(message);
                console.error('sendFile error', message);
            },
            setProgress,
            format
        );
        xhr.send(file);
    } catch (e) {
        errorHandler(e);
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
