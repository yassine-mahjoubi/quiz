const urlTFetch = 'https://picocss.com/docs'
const url = `/.netlify/functions/parser?url=${encodeURIComponent(urlTFetch)}`

const fetchUrl = async (url: string) => {
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

export const tada = await fetchUrl(url)
