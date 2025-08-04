// Import api response type
import { type ApiResponse } from '../type/Type.ts'

// Import the quiz generator tool
import { schema } from './quizGeneratorTool.ts'

// Import Jina reader API
import { fetchCententFromUrl } from './jina.ts'
const urlToFetch = 'https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/'
// Import Gemini LLM
import ai from './gemini.ts'

/**
 * generateQuiz: crée un quiz en se basant sur url fourni ( le contexte) et la question avec des options
 * @param  {string} yourQuestion - input obligatoire, la question
 * @param {string} level - peut être facile|moyen|déficile par défaut facile
 * @param {number} numberQuestion - nombre de questions peut être 5|10|15 par défault 5
 * @param {string} locale - la langue de l'user fr|eng
 * @param {string} url - optionel par default url sur les criteres d'rgaa,
 * @returns {Promise<{text: string, context: string }>} object contenant le contexte génére par JINA et text généré par gemini
 */
export async function generateQuiz(
  yourQuestion: string,
  level: string,
  numberQuestion: number,
  locale: string,
  url: string,
): Promise<{ text: string; context: string }> {
  const context = await fetchCententFromUrl(url || urlToFetch)
  if (!context) {
    throw new Error("La réponse de l'API JINA était vide.")
  }
  const finalPrompt = `en te basant uniquement sur le context suivant:
  ---
  ${context}
  ---
  crée un quiz en ${locale == 'fr' ? 'français' : 'Anglais '} avec ${numberQuestion} questions, niveau ${level} sur: ${yourQuestion}  `

  const response = <ApiResponse>await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: finalPrompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  })
  const parts = response?.candidates?.[0].content?.parts?.[0]
  const text = parts?.text
  // check the response
  if (!text) {
    // On peut créer notre propre erreur pour la gérer dans le catch.
    throw new Error("La réponse de l'API était vide.")
  }

  return { text, context }
}
