/**
 * init GoogleGenAI API client
 * */

import { GoogleGenAI } from '@google/genai'
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables.')
}
const genAIClient = new GoogleGenAI({ apiKey: apiKey })

// const fetchModels = async () => {
//   try {
//     const models = await genAIClient.models.list()
//     const okModels = models.page.filter((model) =>
//       model.supportedActions?.includes('generateContent'),
//     )
//     console.log(okModels)
//   } catch (error) {
//     console.log('error: ', error)
//   }
// }

export default genAIClient
