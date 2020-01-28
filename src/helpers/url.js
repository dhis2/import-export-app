export const ANCHOR_ID = 'dhis2-importexport-downloadlink'

const createAnchor = (url, section) => {
    const a = document.createElement('a')
    a.id = ANCHOR_ID
    a.style.display = 'none'
    a.target = '_blank'
    a.download = section || 'exported_data'
    a.href = url

    return a
}

const preventDownloadAndSetClass = event => {
    event.preventDefault()
    event.target.classList.add('clicked')
}

export const download = (url, section) => {
    const existingAnchor = document.getElementById(ANCHOR_ID)

    if (existingAnchor) {
        existingAnchor.parentNode.removeChild(existingAnchor)
    }

    const anchor = createAnchor(url, section)

    if (window.Cypress) {
        anchor.onclick = preventDownloadAndSetClass
    }

    document.body.appendChild(anchor)
    anchor.click()
}
