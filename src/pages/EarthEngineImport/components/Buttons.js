;<div className={styles.row}>
    {!showPreview ? (
        <>
            <Tooltip
                content={i18n.t("Some required options haven't been selected")}
                disabled={isMissingRequiredInputs()}
            >
                <Button
                    // type="button"
                    // primary
                    // name="preview"
                    onClick={showData}
                    // value="default"
                    // className={styles.leftButton}
                    // disabled={isMissingRequiredInputs()}
                >
                    {i18n.t('Preview import summary')}
                </Button>
            </Tooltip>
            <Tooltip
                content={i18n.t("Some required options haven't been selected")}
                disabled={isMissingRequiredInputs()}
            >
                <Button
                    name="import"
                    onClick={onImport}
                    value="default"
                    disabled={isMissingRequiredInputs()}
                >
                    {i18n.t('Import without previewing')}
                </Button>
            </Tooltip>
        </>
    ) : (
        <>
            <Button
                primary
                name="import"
                onClick={onImport}
                value="default"
                className={styles.leftButton}
            >
                {i18n.t('Import')}
            </Button>
            <Button name="make-changes" onClick={clearEeData} value="default">
                {i18n.t('Make changes to selections')}
            </Button>
        </>
    )}
</div>
