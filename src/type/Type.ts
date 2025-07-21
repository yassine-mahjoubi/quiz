//response?.candidates?.[0].content?.parts?.[0]

type ApiText = {
  text?: string
}

type ApiContent = {
  parts?: ApiText[]
}

type ApiCandidate = {
  content?: ApiContent
}

type ApiResponse = {
  candidates?: ApiCandidate[]
}

interface Question {
  choices: string[]
  correct_answer_index: number
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  question_text: string
  category: string
}

interface quizResponse {
  quiz_questions: Question[]
}

type invalid = boolean | undefined

// Exporting types for use in other parts of the application
export type { invalid, quizResponse, Question, ApiText, ApiContent, ApiCandidate, ApiResponse }
