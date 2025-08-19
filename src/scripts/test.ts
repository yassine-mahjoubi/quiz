import { getMarkdownFromUrl } from '../../netlify/functions/parser/index'

const urlTFetch = 'https://picocss.com/docs'

const test = async (url: string): Promise<string> => {
  try {
    const result = await getMarkdownFromUrl(url)
    console.log('🚀 ~ test ~ result:', result)
    return result
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

test(urlTFetch)
