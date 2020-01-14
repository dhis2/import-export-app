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

export { createBlob, downloadBlob, jsDateToISO8601, pathToId };
