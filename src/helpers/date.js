export function today() {
    return new Date()
}

export function endDateDefault() {
    const d = new Date()
    d.setMonth(d.getMonth() - 3)
    return d
}
