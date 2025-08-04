const apiKey = import.meta.env.VITE_JINA_API_KEY
const jina = 'https://r.jina.ai/'

/**
 * fetchCententFromUrl()
 * @param urlToAnalyse
 * @returns content: string
 */
export async function fetchCententFromUrl(urlToAnalyse: string): Promise<string> {
  const url = jina + urlToAnalyse
  console.log('url', url)
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
    const content = await response.text()
    return content
  } catch (error) {
    console.error('Error with JINA api reader', error)
    throw new Error("can't load the content from the url")
  }
}
