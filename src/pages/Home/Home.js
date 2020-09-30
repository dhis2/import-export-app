import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Page } from '../../components/index'
import { HomeCard } from './HomeCard'
import styles from './Home.module.css'
import { importPages, exportPages } from './pages'

// PAGE INFO
const PAGE_NAME = i18n.t('Overview: Import/Export', {
    nsSeparator: '>',
})
const PAGE_DESCRIPTION = i18n.t('Import or export DHIS2 data.')

const Home = () => (
    <Page title={PAGE_NAME} desc={PAGE_DESCRIPTION} dataTest="page-overview">
        <h2 className={styles.categoryTitle}>{i18n.t('Import')}</h2>
        <div className={styles.grid}>
            {importPages.map(({ name, description, linkText, to }, i) => (
                <HomeCard
                    key={i}
                    titleText={name}
                    bodyText={description}
                    linkText={linkText}
                    to={to}
                />
            ))}
        </div>
        <h2 className={styles.categoryTitle}>{i18n.t('Export')}</h2>
        <div className={styles.grid}>
            {exportPages.map(({ name, description, linkText, to }, i) => (
                <HomeCard
                    key={i}
                    titleText={name}
                    bodyText={description}
                    linkText={linkText}
                    to={to}
                />
            ))}
        </div>
    </Page>
)

export { Home }
