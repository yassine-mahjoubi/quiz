// Import api response type
import { type ApiResponse } from '../type/Type.ts'

// Import the quiz generator tool
import { schema } from './quizGeneratorTool.ts'

// Import Jina reader API
import { fetchCententFromUrl } from './jina.ts'

// Import mimic JIna
import { getMarkdownFromUrl } from './mimicJIna.ts'

// Import Gemini LLM
import ai from './gemini.ts'

/**
 * extract content from url using servie JIna sinon switch to mimicJina in case of echec
 * @param {string} url source to extract the content from
 * @returns {Promise<string|null>} content as markdwon
 */

const extractContentFromUrl = async (url: string): Promise<string | null> => {
  let sourceContent = null
  try {
    sourceContent = await fetchContext(url)
    if (!sourceContent) {
      throw new Error('erreur lors du fetchContext')
    }
  } catch (error) {
    console.log('erreur when fetching url with JIna :', error)
    console.warn('switch to craft handmade mimicJIna')
    try {
      sourceContent = await getMarkdownFromUrl(url)
    } catch (error) {
      console.log('erreur when fetching url with MimicJIna :', error)
    }
  }
  return sourceContent
}

/**
 *
 * @param {string|null} context: text content as the only source
 * @returns {string} prompt based on context
 */
const promptContext = (context: string | null): string => {
  if (!context) return ''
  return `
en te basant uniquement sur le context suivant:
  ---
  ${context}
  ---
  `
}

/**
 *
 * @param url
 * @returns
 */
const fetchContext = async (url: string): Promise<string | null> => {
  let result: string | null = ''

  try {
    const response = await fetchCententFromUrl(url)
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
 * @returns {string} final prompt to generate the quiz
 */
export const prompt = (
  context: string | null,
  lang: string,
  numberQuestion: number,
  level: string,
  question: string,
): string => {
  return `${context} ? ${context} :'' Crée un quiz en ${lang == 'fr' ? 'français' : 'anglais'} avec ${numberQuestion} questions, niveau ${level} sur: ${question}`
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
 * Clés des messages pour les différents états de génération de quiz
 * @readonly
 */
const MESSAGE_KEY = {
  /** Message d'erreur quand la génération échoue */
  ERROR: 'quiz.generated.generationFailed',
  /** Message de succès quand une URL est utilisée */
  WITH_URL: 'quiz.generated.withUrl',
  /** Message de succès sans le choix (sans URL) */
  WITHOUT_URL: 'quiz.generated.withoutUrl',
  /** Message de succès en mode fallback (URL fourni mais echec) */
  WITH_FALLBACK: 'quiz.generated.withFallback',
} as const

/**
 * Détermine la clé de message appropriée selon le résultat de génération
 * @param {string} text - Le texte généré (vide si échec)
 * @param {string|null} context - Le contexte URL utilisé (null si fallback)
 * @returns {string} La clé de message correspondante
 */
const handleMessageKey = (
  text: string,
  context: string | null,
  contextEnabled: boolean,
): string => {
  // 1: case: echec global (gemini)
  if (!text) return MESSAGE_KEY.ERROR

  // 2: case: success (gemini) without context choice
  if (!contextEnabled) return MESSAGE_KEY.WITHOUT_URL

  // 3: case: success global ( gemini et jina)
  if (context) return MESSAGE_KEY.WITH_URL

  // 4: Case l'user voulait un contexte, mais ça a échoué (fallback)
  return MESSAGE_KEY.WITH_FALLBACK
}

/**
 * generateQuiz: crée un quiz en se basant sur url fourni ( le contexte) et la question avec des options
 * @param  {string} question - la question de l'user
 * @param {string} level - peut être facile|moyen|déficile par défaut facile
 * @param {number} numberQuestion - nombre de questions peut être 5|10|15 par défault 5
 * @param {string} lang - la langue de l'user fr|eng
 * @param {string} url - optionel par default disabled,
 * @param {string} contextEnabled - optionnel par default false si activé alors url obligatoire,
 * @returns {Promise<{text: string, context: string|null, message:string }>} object contenant le contexte génére soit par JINA si non disponible il switch vers mimicJna et text généré par gemini
 */
export async function generateQuiz(
  question: string,
  level: string,
  numberQuestion: number,
  lang: string,
  url: string,
  contextEnabled: boolean,
): Promise<{ text: string; context: string | null; messageKey: string }> {
  let context = null
  if (contextEnabled) {
    context = await extractContentFromUrl(url)
  }

  const promptUser = prompt(context, lang, numberQuestion, level, question)

  const text = await fetchText(promptUser)

  const messageKey = handleMessageKey(text, context, contextEnabled)

  return { text, context, messageKey }
}
