export function today() {
  const d = new Date()

  const mm = (d.getMonth() + 1).toString()
  const dd = d.getDate().toString()
  return `${d.getFullYear()}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
}
