/**
 * Group and sort schemas
 * ======================
 */
const groupSchemas = schemas =>
    schemas.reduce((groups, schema) => {
        const { group } = schema;

        return {
            ...groups,

            // add schema to "group" collection if existing,
            // otherwise create new collection with schema as first entry
            [group]: groups[group] ? [...groups[group], schema] : [schema],
        };
    }, {});

const combineSingleItemGroups = groups => {
    const groupNames = Object.keys(groups);

    return groupNames.reduce(
        (combinedGroups, groupName) => {
            const group = groups[groupName];

            if (group.length === 1) {
                return {
                    ...combinedGroups,
                    other: [...combinedGroups.other, group[0]],
                };
            }

            return {
                ...combinedGroups,
                [groupName]: group,
            };
        },
        { other: [] }
    );
};

/**
 * Get group label helpers
 * =======================
 */

/**
 * This function will loop through all schemas and
 * compare the the lower case groupKey with
 * the schemas' name.
 * If a match is found, that match will be returned
 */
function findLabelByLowerCaseComparison(groupKey, schemas) {
    const isGroupKeyMatchingLowerCaseSchemaName = schemaName =>
        groupKey === schemaName.toLowerCase();

    return schemas.reduce((foundLabel, { name: schemaName, displayName }) => {
        // do not try to compare anything if a label already
        // has been found
        if (foundLabel) return foundLabel;

        if (isGroupKeyMatchingLowerCaseSchemaName(schemaName)) {
            return displayName;
        }

        return foundLabel;
    }, '');
}

const ucFirst = str => str[0].toUpperCase() + str.substr(1);

/**
 * This function will go through all schemas
 * and will compare the scheme name with the
 * lower case group key at position 0 of the schema key.
 * Once a match is found, the match will be extracted,
 * spaces will be inserted before all capital letters
 * and the result returned
 */
function findKeyByCamelCaseComparison(groupKey, schemas) {
    const isGroupKeyInSchemaName = schemaName =>
        schemaName.includes(groupKey) && schemaName.indexOf(groupKey) === 0;

    // Will return either a label or an empty string
    // if no match for the groupKey was found
    return schemas.reduce((foundLabel, { name: schemaName }) => {
        // do not try to compare anything if a label already
        // has been found
        if (foundLabel) return foundLabel;

        const lowerCaseSchemaName = schemaName.toLowerCase();

        if (isGroupKeyInSchemaName(lowerCaseSchemaName)) {
            return ucFirst(
                schemaName
                    // extract part that matches the groupKey
                    .substr(0, groupKey.length)
                    // insert space before capital letters
                    .replace(/([A-Z]+)/g, ' $1')
            );
        }

        return foundLabel;
    }, '');
}

function extractGroupLabelFromSchemas(groupKey, schemas) {
    const lowerCaseGroupKey = groupKey.toLowerCase();

    if (lowerCaseGroupKey === 'oauth2' || lowerCaseGroupKey === 'other') {
        return groupKey;
    }

    return (
        findLabelByLowerCaseComparison(lowerCaseGroupKey, schemas) ||
        findKeyByCamelCaseComparison(lowerCaseGroupKey, schemas) ||
        groupKey[0].toUpperCase() + groupKey.substr(1)
    );
}

const getSchemaGroups = schemas => {
    const groups = groupSchemas(schemas);
    const combinedGroups = combineSingleItemGroups(groups);
    return combinedGroups;
};

const getGroupLabels = schemaGroups => {
    return Object.entries(schemaGroups).reduce(
        (groupLabels, [groupKey, schemas]) => {
            const label = extractGroupLabelFromSchemas(groupKey, schemas);

            return {
                ...groupLabels,
                [groupKey]: label,
            };
        },
        {}
    );
};

const getGroupOrder = schemas => {
    const groupKeys = Object.keys(schemas);
    groupKeys.sort();
    return groupKeys;
};

const filterOutExcludedSchemas = (excludedSchemas, schemas) =>
    schemas.filter(
        schema => schema.metadata && !excludedSchemas.has(schema.collectionName)
    );

const groupName = klass => {
    const group = klass.split('.');
    group.pop();

    if (!klass.includes('.dhis')) {
        group.pop();
    }

    return group[group.length - 1].replace(/(.)([A-Z])/g, '$1 $2');
};

const formatSchemas = (schemas, checkedByDefault) =>
    schemas.map(schema => ({
        checked: checkedByDefault,
        label: schema.displayName,
        name: schema.collectionName,
        group: groupName(schema.klass),
    }));

export {
    filterOutExcludedSchemas,
    groupName,
    formatSchemas,
    getSchemaGroups,
    getGroupLabels,
    getGroupOrder,
};
