/**generateQuiz : apel l'api gemini pour avoir un json contant un quiz respectant un @schema donnée  */

import { type ApiResponse } from '../type/Type.ts'
// Import the Google GenAI library
import { GoogleGenAI } from '@google/genai'
// Ensure the Google GenAI library is available
if (!GoogleGenAI) {
  throw new Error('Google GenAI library is not available. Please check your setup.')
}
// Import the quiz generator tool
import { schema } from './quizGeneratorTool.ts'

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_KEY_GEMINI_API_KEY })

try {
  // Check if the Google GenAI library is loaded
  if (typeof GoogleGenAI === 'undefined') {
    throw new Error('Google GenAI library is not loaded.')
  }
} catch (error) {
  console.error('Error initializing Google GenAI:', error)
}

export async function generateQuiz(yourQuestion: string, level: string): Promise<string> {
  const response = <ApiResponse>await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `crée un quiz niveau ${level} sur: ${yourQuestion} ?`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  })
  const parts = response?.candidates?.[0].content?.parts?.[0]
  const text = parts?.text
  //vérifier que la réponse contient bien ce qu'on attend.
  if (!text) {
    // On peut créer notre propre erreur pour la gérer dans le catch.
    throw new Error("La réponse de l'API était vide.")
  }

  return text
}
