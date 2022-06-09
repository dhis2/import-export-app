const userSettingsQuery = {
    resource: 'userSettings',
    params: {
        key: ['keyAnalysisDisplayProperty'],
    },
}

export const fetchUserSettings = async engine => {
    const { userSettings } = await engine.query({
        userSettings: userSettingsQuery,
    })

    return userSettings
}
