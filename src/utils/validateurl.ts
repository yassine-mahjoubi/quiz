/**
 * check si l'url est valide et starts with http:// ou https://
 * @param {string} urlToCheck - l'url à valider
 * @returns {boolean} - retourne true si l'url est valide
 */
export const isvalideUrl = (urlToCheck: string): boolean => {
  if (!urlToCheck && urlToCheck.length > 6) return false
  try {
    const url = new URL(urlToCheck)
    const startwith = url.toString().startsWith('http://')
    const startwiths = url.toString().startsWith('https://')
    return startwith || startwiths ? true : false
  } catch (error) {
    console.error('url Invalid:', error)
    return false
  }
}
