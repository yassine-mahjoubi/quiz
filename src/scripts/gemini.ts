/**
 * apel l'api gemini pour avoir un json
 * respectant un @schema donnée
 * */

// Import the Google GenAI library
import { GoogleGenAI } from '@google/genai'

// Ensure the Google GenAI library is available and loaded
try {
  if (!GoogleGenAI) {
    throw new Error('Google GenAI library is not available. Please check your setup.')
  }
  if (typeof GoogleGenAI === 'undefined') {
    throw new Error('Google GenAI library is not loaded.')
  }
} catch (error) {
  console.error('Error initializing Google GenAI:', error)
}
// Initialize the Google GenAI client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: apiKey })

export default ai
