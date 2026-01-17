const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://yassine-mahjoubi-quiz-ia-generator.netlify.app/.netlify/functions/parser?url='
    : '/.netlify/functions/parser?url='

/**
 * fetch content parsed as markdown from netlify servless function based on url,
 * @param {string} urlToFetch url to fetch content from to be parsed
 * @returns {Promise<string | null>} contenu retourné sous format markdown
 */
export const getMarkdownFromUrl = async (urlToFetch: string): Promise<string | null> => {
  const url = `${BASE_URL}${encodeURIComponent(urlToFetch)}`
  let result = null
  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.log('erreur', response.status)
      return null
    }
    result = await response.text()
  } catch (error) {
    console.log('error when catching servless function from Netlify ', error)
  }
  return result
}
