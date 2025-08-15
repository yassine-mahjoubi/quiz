const ALLOWED_PROTOCOL: string[] = ['https:', 'http:']
/**
 * check si l'url est valide et starts with http:// ou https://
 * @param {string} urlToCheck - l'url à valider
 * @returns {boolean} - retourne true si l'url est valide
 */

export const isvalideUrl = (urlToCheck: string): boolean => {
  if (!urlToCheck || urlToCheck.length < 11) return false
  try {
    const url = new URL(urlToCheck)
    console.log('🚀 ~ isvalideUrl ~ url:', url.protocol)
    return ALLOWED_PROTOCOL.includes(url.protocol)
  } catch (error) {
    console.error('syntaxe url Invalid:', error)
    return false
  }
}
