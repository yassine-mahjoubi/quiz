/**
 * init GoogleGenAI API client
 * */

import { GoogleGenAI } from '@google/genai'
const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables.')
}
const genAIClient = new GoogleGenAI({ apiKey: apiKey })

export default genAIClient
