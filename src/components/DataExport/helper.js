import i18n from '@dhis2/d2-i18n';

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

const helper = (
    apiBaseUrl,
    setDataElementIdSchemeOptions,
    setOrgUnitIdSchemeOptions,
    setIdSchemeOptions
) => {
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

export { helper };
