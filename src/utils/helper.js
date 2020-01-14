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

export { pathToId, jsDateToISO8601 };
