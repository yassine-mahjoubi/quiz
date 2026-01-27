/**
 * init GoogleGenAI API client
 * */

import { GoogleGenAI } from '@google/genai'
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables.')
}
const genAIClient = new GoogleGenAI({ apiKey: apiKey })

// models who support JSON schema
//https://ai.google.dev/gemini-api/docs/structured-output?example=recipe#structured_outputs_vs_function_calling
//model_id =  "gemini-2.5-flash" # or "gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.5-pro","gemini-3-pro-preview"
/* const fetchModels = async () => {
  try {
    const models = await genAIClient.models.list()
    const okModels = models.page.filter(
      (model) =>
        model.supportedActions?.includes('generateContent') &&
        !model.description?.toLowerCase().includes('image') &&
        !model.description?.toLowerCase().includes('video') &&
        !model.description?.toLowerCase().includes('tts') &&
        !model.description?.toLowerCase().includes('embedding') &&
        !model.name?.includes('embedding') &&
        !model.name?.includes('aqa'),
    )
    console.log(okModels.map((model) => model.name?.replace('models/', '')))
    console.log(okModels.map((model) => model))
  } catch (error) {
    console.log('error: ', error)
  }
} */

export default genAIClient
