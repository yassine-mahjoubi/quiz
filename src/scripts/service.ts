// Import api response type
import { type ApiResponse } from '../type/Type.ts'

// Import the quiz generator tool
import { schema } from './quizGeneratorTool.ts'

// Import Jina reader API
import { fetchCententFromUrl } from './jina.ts'
const urlToFetch: string = ''
// Import Gemini LLM
import ai from './gemini.ts'

/**
 *
 * @param context
 * @returns
 */
const promptContext = (context: string): string => {
  return context
    ? `en te basant uniquement sur le context suivant:
  ---
  ${context}
  ---`
    : ''
}
/**
 *
 * @param url
 * @returns
 */
const fetchContext = async (url: string): Promise<string | null> => {
  let result: string | null = ''

  try {
    const response = await fetchCententFromUrl(url || urlToFetch)
    if (response) {
      result = promptContext(response)
    } else {
      result = null
      throw new Error("Le contenu récupéré depuis l'URL est vide.")
    }
  } catch (error) {
    console.error("Impossible de récupérer le contenu de l'URL:", error)
  }
  return result
}
/**
 *
 * @param context
 * @param lang
 * @param numberQuestion
 * @param level
 * @param question
 * @returns
 */
const prompt = (
  context: string | null,
  lang: string,
  numberQuestion: number,
  level: string,
  question: string,
): string => {
  return `${context ? context : ''}
  crée un quiz en ${lang == 'fr' ? 'français' : 'Anglais '} avec ${numberQuestion} questions, niveau ${level} sur: ${question}  `
}
/**
 *
 * @param promptUser
 * @returns
 */
const fetchText = async (promptUser: string): Promise<string> => {
  let textContent: string = ''
  try {
    const response = <ApiResponse>await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptUser,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    })
    const parts = response?.candidates?.[0].content?.parts?.[0]
    textContent = parts?.text ?? ''
  } catch (error) {
    console.log(error)
    textContent = ''
  }
  return textContent
}
/**
 *
 * @param text
 * @param context
 * @returns
 */
const handleMessageKey = (text: string, context: string | null): string => {
  if (!text) {
    return 'quiz.generated.generationFailed'
  }
  if (context) {
    return 'quiz.generated.withUrl'
  }

  return 'quiz.generated.withFallback'
}

/**
 * generateQuiz: crée un quiz en se basant sur url fourni ( le contexte) et la question avec des options
 * @param  {string} question - la question de l'user
 * @param {string} level - peut être facile|moyen|déficile par défaut facile
 * @param {number} numberQuestion - nombre de questions peut être 5|10|15 par défault 5
 * @param {string} locale - la langue de l'user fr|eng
 * @param {string} url - optionel par default url sur les criteres d'rgaa,
 * @returns {Promise<{text: string, context: string, message:string }>} object contenant le contexte génére par JINA et text généré par gemini
 */
export async function generateQuiz(
  question: string,
  level: string,
  numberQuestion: number,
  lang: string,
  url: string,
): Promise<{ text: string; context: string | null; messageKey: string }> {
  const context = await fetchContext(url)

  const promptUser = prompt(context, lang, numberQuestion, level, question)

  const text = await fetchText(promptUser)

  const messageKey = handleMessageKey(text, context)

  return { text, context, messageKey }
}
