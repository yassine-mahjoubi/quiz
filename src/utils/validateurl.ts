/**
 * isvalideUrl() - check si l'url starts with http:// ou https://
 * @param urlToCheck {string}
 * @returns true or false
 */
export const isvalideUrl = (urlToCheck: string): boolean => {
  const url = new URL(urlToCheck)
  const startwith = url.toString().startsWith('http://')
  const startwiths = url.toString().startsWith('https://')
  return startwith || startwiths ? true : false
}
