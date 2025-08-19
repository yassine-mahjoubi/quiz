export const fetchUrl = async (urlTFetch: string) => {
  const url = `/.netlify/functions/parser?url=${encodeURIComponent(urlTFetch)}`

  let result = null
  try {
    const response = await fetch(url)
    console.log('🚀 ~ fetchUrl ~ response:', response)
    result = await response.text()
    console.log('🚀 ~ fetchUrl ~ result:', result)
  } catch (error) {
    console.log('error catch ', error)
    return null
  }
  console.log('🚀 ~ fetchUrl ~ result:', result)
  return result
}
