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

type difficulty = 'Facile' | 'Moyen' | 'Difficile'

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
  ModelIA,
}
