const hasAuthorityToSkipAudit = authorities =>
    authorities.includes('ALL') ||
    authorities.includes('F_SKIP_DATA_IMPORT_AUDIT')

const hasAuthorityToSelectAllOrgUnits = authorities =>
    authorities.includes('ALL')

export { hasAuthorityToSkipAudit, hasAuthorityToSelectAllOrgUnits }
