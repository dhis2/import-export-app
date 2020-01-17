import i18n from '@dhis2/d2-i18n';

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
            console.log('DataExport data element attributes fetch error: ', e);
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
            console.log(
                'DataExport organization unit attributes fetch error: ',
                e
            );
        }
    );
};

export {
    createBlob,
    downloadBlob,
    fetchAndSetAttributes,
    jsDateToISO8601,
    pathToId,
};
