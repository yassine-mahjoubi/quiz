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

type difficulty = 'facile' | 'moyen' | 'difficile'

type numberQuestions = 5 | 10 | 15

interface Question {
  choices: string[]
  correct_answer_index: number
  difficulty: difficulty
  question_text: string
  category: string
  lang: string
}

interface quizResponse {
  quiz_questions: Question[]
  error: string
}

type invalid = boolean | undefined
type Model = 'gemini-3-flash-preview' | 'gemini-2.5-flash' | 'gemini-flash-latest'

interface Quiz {
  id: string
  subject: string
  difficulty: string
  model: Model
  number_question: number
  language: string
  url: string
  context_md: string
  created_at: string
  quiz_json: string
}

export type {
  invalid,
  quizResponse,
  Question,
  ApiText,
  ApiContent,
  ApiCandidate,
  ApiResponse,
  difficulty,
  numberQuestions,
  Quiz,
  Quiz2,
}
